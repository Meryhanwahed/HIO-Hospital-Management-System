import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-setting-details',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './setting-details.component.html',
  styleUrls: ['./setting-details.component.scss']
})
export class SettingDetailsComponent implements OnInit {
  profileForm!: FormGroup;
  apiUrl = 'https://gradution-project-silk.vercel.app/api/users';
  userId = '';
  userData: any = {};
  token = '';
  loadingData = true;
  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUserDataFromLocalStorage();

    if (!this.userData.phone || !this.userData.nationalId) {
      this.loadUserDataFromServer();
    } else {
      this.loadingData = false;
    }
  }

  initForm(): void {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      nationalId: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      password: ['']
    });
  }

  loadUserDataFromLocalStorage(): void {
    this.token = localStorage.getItem('token') || '';

    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const parsedUser = JSON.parse(userStr);
        this.userData = { ...this.userData, ...parsedUser };
        this.userId = parsedUser._id || '';
      }

      const fields = ['username', 'nationalId', 'email', 'gender', 'age', 'phone'];
      fields.forEach(field => {
        const value = localStorage.getItem(field);
        if (value) this.userData[field] = value;
      });

      this.updateFormWithUserData();
    } catch (error) {
      console.error('خطأ في جلب بيانات المستخدم من التخزين المحلي:', error);
    }
  }

  updateFormWithUserData(): void {
    if (this.userData) {
      this.profileForm.patchValue({
        username: this.userData.username || '',
        nationalId: this.userData.nationalId || '',
        email: this.userData.email || '',
        gender: this.userData.gender || '',
        age: this.userData.age || '',
        phone: this.userData.phone || ''
      });
    }
  }

  loadUserDataFromServer(): void {
    if (!this.userId || !this.token) {
      this.errorMessage = 'لا يمكن جلب بيانات المستخدم. الرجاء تسجيل الدخول مرة أخرى.';
      this.loadingData = false;
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get(`${this.apiUrl}/me`, { headers }).subscribe({
      next: (data: any) => {
        this.userData = { ...this.userData, ...data };
        this.updateFormWithUserData();
        this.loadingData = false;
      },
      error: (err) => {
        console.error('خطأ في جلب بيانات المستخدم من الخادم:', err);
        this.errorMessage = 'حدث خطأ أثناء جلب البيانات من الخادم.';
        this.loadingData = false;
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.markFormGroupTouched(this.profileForm);
      return;
    }

    const formData = { ...this.profileForm.value };
    if (!formData.password) delete formData.password;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    this.http.put(`${this.apiUrl}/update/${this.userId}`, formData, { headers }).subscribe({
      next: () => {
        this.successMessage = 'تم تحديث البيانات بنجاح';
        this.updateLocalStorage(formData);
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      error: (err) => {
        console.error('خطأ في تحديث البيانات:', err);
        this.errorMessage = err.error?.message || 'حدث خطأ أثناء تحديث البيانات';
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    });
  }

  updateLocalStorage(formData: any): void {
    Object.keys(formData).forEach(key => {
      if (formData[key]) localStorage.setItem(key, formData[key]);
    });

    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        const updatedUser = { ...user, ...formData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('خطأ في تحديث بيانات المستخدم في التخزين المحلي:', error);
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  resetForm(): void {
    this.updateFormWithUserData();
  }
}
