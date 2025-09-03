import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PatientsService } from '../../services/patient.service';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  patients: any[] = [];
  loading = true;
  error = '';

  filterDept = '';   // فلترة بالقسم الطبي
  sortField = '';    // ترتيب حسب حقل معين

  constructor(private patientService: PatientsService) {}

  ngOnInit() {
    this.loadPatients();
  }

  // 🔹 جلب كل المرضى
  loadPatients() {
    this.loading = true;
    this.patientService.getAllPatients(this.sortField).subscribe({
      next: (res: any) => {
        this.patients = res.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ خطأ في تحميل المرضى:', err);
        this.error = 'فشل في تحميل بيانات المرضى';
        this.loading = false;
      }
    });
  }

  // 🔹 تطبيق الفلترة
  applyFilters() {
    if (this.filterDept) {
      this.loading = true;
      this.patientService.getFilteredPatients(this.filterDept).subscribe({
        next: (res: any) => {
          this.patients = res.data;
          this.loading = false;
        },
        error: (err) => {
          console.error('❌ خطأ في الفلترة:', err);
          this.error = 'فشل في جلب المرضى بالقسم المطلوب';
          this.loading = false;
        }
      });
    } else {
      this.loadPatients();
    }
  }

  // 🔹 استرجاع المرضى (إعادة تعيين الفلاتر)
  resetFilters() {
    this.filterDept = '';
    this.sortField = '';
    this.loadPatients();
  }

  // باقي الأكواد: delete / view / download PDF كما هي
  deletePatient(id: string) {
    if (confirm('هل تريد حذف هذا المريض؟')) {
      this.patientService.deletePatient(id).subscribe({
        next: () => {
          this.patients = this.patients.filter(p => p._id !== id);
          alert('✅ تم حذف المريض');
        },
        error: (err) => {
          console.error('❌ خطأ في الحذف:', err);
          alert('فشل في حذف المريض');
        }
      });
    }
  }

  viewPdf(patientId: string) {
    this.patientService.getPatientPdf(patientId).subscribe({
      next: (pdfBlob) => {
        const fileURL = window.URL.createObjectURL(pdfBlob);
        window.open(fileURL, '_blank');
      },
      error: (err) => {
        console.error('❌ خطأ في عرض PDF:', err);
        alert('فشل في عرض ملف المريض');
      }
    });
  }

  downloadPdf(patientId: string) {
    this.patientService.getPatientPdf(patientId).subscribe({
      next: (pdfBlob) => {
        const fileURL = window.URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = fileURL;
        a.download = `patient-${patientId}.pdf`;
        a.click();
        window.URL.revokeObjectURL(fileURL);
      },
      error: (err) => {
        console.error('❌ خطأ في تحميل PDF:', err);
        alert('فشل في تحميل ملف المريض');
      }
    });
  }
}
