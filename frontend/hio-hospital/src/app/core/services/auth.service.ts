import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://gradution-project-silk.vercel.app/api/users';

  constructor(private http: HttpClient) {}

  // تسجيل الدخول
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, credentials);
  }

  // حفظ بيانات المصادقة
  saveAuthData(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  // جلب بيانات المستخدم
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // جلب التوكن
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // هل المستخدم مسجل الدخول؟
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // تسجيل الخروج
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // التسجيل
  register(userData: {
    username: string;
    nationalId: string;
    email: string;
    gender: string;
    age: number;
    phone: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // تحديث الباسورد
  updatePassword(userId: string, newPassword: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/updatePassword/${userId}`, { password: newPassword });
  }

  // تحديث بيانات المستخدم
  updateUser(userId: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${userId}`, data);
  }

  // حذف مستخدم
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${userId}`);
  }
}
