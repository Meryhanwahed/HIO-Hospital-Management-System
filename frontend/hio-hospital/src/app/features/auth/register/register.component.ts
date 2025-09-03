import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      nationalId: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const formData = {
        username: this.registerForm.value.username,
        nationalId: this.registerForm.value.nationalId,
        email: this.registerForm.value.email,
        gender: this.registerForm.value.gender,
        age: this.registerForm.value.age,
        phone: this.registerForm.value.phone,
        password: this.registerForm.value.password
      };

      console.log('📤 البيانات المرسلة للسيرفر:', formData);

      this.auth.register(formData).subscribe({
        next: (res) => {
          alert('✅ تم التسجيل بنجاح!');
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          console.error('❌ خطأ في التسجيل:', err);
          alert('فشل في التسجيل');
        }
      });
    } else {
      alert('⚠️ من فضلك ادخل جميع البيانات بشكل صحيح');
    }
  }
}