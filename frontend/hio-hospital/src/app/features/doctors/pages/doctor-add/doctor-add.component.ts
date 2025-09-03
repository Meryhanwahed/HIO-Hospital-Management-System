import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-doctor-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './doctor-add.component.html',
  styleUrls: ['./doctor-add.component.scss']
})
export class DoctorAddComponent {
  doctorForm: FormGroup;
  message = '';
  error = '';

  constructor(private fb: FormBuilder, private doctorService: DoctorService) {
    this.doctorForm = this.fb.group({
      doctorname: ['', Validators.required],
      nationalId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: [null, Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      specialization: ['', Validators.required],
      medicalDepartment: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.doctorForm.invalid) return;

    this.doctorService.addDoctor(this.doctorForm.value).subscribe({
      next: () => {
        this.message = '✅ تم إضافة الطبيب بنجاح';
        this.error = '';
        this.doctorForm.reset();
      },
      error: (err) => {
        console.error(err);
        this.error = '⚠️ حدث خطأ أثناء إضافة الطبيب';
      }
    });
  }
}
