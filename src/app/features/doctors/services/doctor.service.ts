// src/app/features/doctors/services/doctor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Doctor {
  _id?: string;
  doctorname: string;
  nationalId: string;
  email: string;
  age: number;
  gender: string;
  phone: string;
  specialization: string;
  medicalDepartment: string;
}

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'https://gradution-project-silk.vercel.app/api/doctors';

  constructor(private http: HttpClient) {}

  // إضافة طبيب
  addDoctor(doctor: Doctor): Observable<any> {
    return this.http.post(`${this.apiUrl}/addDoctor`, doctor);
  }

  // جلب كل الأطباء
  getAllDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.apiUrl}/getAllDoctors`);
  }

  // جلب طبيب واحد بالـ ID
  getDoctorById(id: string): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/getById/${id}`);
  }
}
