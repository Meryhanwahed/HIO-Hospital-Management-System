import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientsService } from '../../services/patient.service';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent {
  patientForm: FormGroup;
bloodTypes: any;
medicalDepartments: any;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientsService,
    private router: Router
  ) {
    this.patientForm = this.fb.group({
      username: ['', Validators.required],
      nationalId: ['', [Validators.required, Validators.minLength(14)]],
      age: [null, Validators.required],
      gender: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(11)]],
      address: ['', Validators.required],
      weight: [null, Validators.required],
      height: [null, Validators.required],
      bloodType: ['', Validators.required],
      specializedMedicalDepartment: ['', Validators.required],
      diagnosis: ['', Validators.required],
      habits: [''],
      chronicDiseases: [''],
      CaseDescription: ['', Validators.required],
      needsSurgery: ['', Validators.required],
      doctorName: ['', Validators.required],
      doctorSpecialization: ['', Validators.required],
      treatments: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.patientForm.valid) {
      this.patientService.addPatient(this.patientForm.value).subscribe({
        next: (res) => {
          console.log('✅ تم إضافة المريض:', res);
          alert('تم إضافة المريض بنجاح!');
          this.patientForm.reset();
          this.router.navigateByUrl('/patients/list'); // ✅ بعد الحفظ يرجع للقائمة
        },
        error: (err) => {
          console.error('❌ خطأ في إضافة المريض:', err);
          alert('فشل في إضافة المريض!');
        }
      });
    }
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // دالة مساعدة للتحقق من صلاحية الحقل وعرض رسائل الخطأ
  isFieldInvalid(fieldName: string): boolean {
    const field = this.patientForm.get(fieldName);
    return field!.invalid && (field!.touched || field!.dirty);
  }

  getFieldError(fieldName: string): string {
    const field = this.patientForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return 'هذا الحقل مطلوب';
      if (field.errors['minlength']) return `الحد الأدنى للأحرف هو ${field.errors['minlength'].requiredLength}`;
      if (field.errors['pattern']) {
        if (fieldName === 'nationalId') return 'يجب أن يتكون الرقم القومي من 14 رقمًا';
        if (fieldName === 'phone') return 'رقم الهاتف غير صحيح';
      }
      if (field.errors['min']) return `القيمة يجب أن تكون على الأقل ${field.errors['min'].min}`;
      if (field.errors['max']) return `القيمة يجب أن تكون على الأكثر ${field.errors['max'].max}`;
    }
    return '';
  }
}
