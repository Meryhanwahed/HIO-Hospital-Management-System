import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PatientsService } from '../../services/patient.service';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
[x: string]: any;
  patients: any[] = [];
  loading = true;
  error = '';

  constructor(private patientService: PatientsService) {}

  ngOnInit() {
    this.loadPatients();
  }

 loadPatients() {
  this.patientService.getAllPatients().subscribe({
    next: (res: any) => {
      console.log('📥 البيانات الراجعة من السيرفر:', res);
      this.patients = res.data; // 👈 هنا الحل
      this.loading = false;
    },
    error: (err) => {
      console.error('❌ خطأ في تحميل المرضى:', err);
      this.error = 'فشل في تحميل بيانات المرضى';
      this.loading = false;
    }
  });
}
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
      window.open(fileURL, '_blank'); // يفتح في تبويب جديد
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
