import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  error = '';
  loading = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.error = '';

    this.auth.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log('✅ تسجيل الدخول ناجح (الـ response كامل):', res);

        if (res && res.token) {
          // نحفظ التوكن + الإيميل
          this.auth.saveAuthData(res.token, { email: this.loginForm.value.email });

          // إعادة التوجيه
          this.router.navigate(['/dashboard']);
        } else {
          this.error = '⚠ لم يتم استلام التوكن من السيرفر';
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('❌ خطأ تسجيل الدخول:', err);
        this.error = 'البريد أو كلمة المرور غير صحيحة';
        this.loading = false;
      }
    });
  }
}
