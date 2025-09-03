import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Patient {
  _id?: string;
  username: string;
  nationalId: string;
  age: number;
  gender: string;
  phone: string;
  address: string;
  weight: number;
  height: number;
  bloodType: string;
  specializedMedicalDepartment: string;
  diagnosis: string;
  habits: string;
  chronicDiseases: string;
  CaseDescription: string;
  needsSurgery: string;
  doctorName: string;
  doctorSpecialization: string;
  treatments: string;
}

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  private apiUrl = 'https://gradution-project-silk.vercel.app/api/patients';

  constructor(private http: HttpClient) {}

  // ✅ الحصول على جميع المرضى مع إمكانية الترتيب
  getAllPatients(sort: string = ''): Observable<any> {
    const url = sort ? `${this.apiUrl}/?sort=${sort}` : `${this.apiUrl}/`;
    return this.http.get(url);
  }

  // ✅ الحصول على مريض بالـ ID
  getById(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/getById/${id}`);
  }

  // ✅ الحصول على مرضى بقسم معين
  getFilteredPatients(department: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getFilteredPatients?specializedMedicalDepartment=${department}`);
  }

  // ✅ إضافة مريض
  addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiUrl}/addPatient`, patient);
  }

  // ✅ تحديث بيانات مريض
  updatePatient(id: string, data: Partial<Patient>): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/update/${id}`, data);
  }

  // ✅ حذف مريض
  deletePatient(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  // ✅ الحصول على PDF لمريض
  getPatientPdf(patientId: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/file/${patientId}`, { responseType: 'blob' });
  }
}
