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
}
