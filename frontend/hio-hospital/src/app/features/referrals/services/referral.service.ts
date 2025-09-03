import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Referral {
  _id?: string;
  referralToSection: string;
  reasonForReferral: string;
  referralTo: string;
  patientId?: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReferralService {
  [x: string]: any;
  private apiUrl = 'https://gradution-project-silk.vercel.app/api/referrals';

  constructor(private http: HttpClient) {}

  createReferral(patientId: string, referralData: Referral): Observable<any> {
    return this.http.post(`${this.apiUrl}/createReferralModel/${patientId}`, referralData);
  }

  // جلب كل الإحالات
  getReferrals(): Observable<Referral[]> {
    return this.http.get<Referral[]>(`${this.apiUrl}/getReferrals`);
  }

  // جلب إحالة واحدة بالـ ID
 getReferralById(referralId: string): Observable<Referral> {
  return this.http.get<Referral>(`${this.apiUrl}/getReferralById/${referralId}`);
}

}
