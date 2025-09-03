import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientsService, Patient } from '../../services/patient.service';
import { ReferralService, Referral } from '../../../referrals/services/referral.service';
import { ReferralFormComponent } from '../../../referrals/pages/referral-form/referral-form.component';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ReferralFormComponent],
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {
  patient?: Patient;
  patientId = '';
  patientForm!: FormGroup;
  referrals: Referral[] = [];
  loading = true;
  error = '';
  editing = false;
  showReferralForm = false;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientsService,
    private referralService: ReferralService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) {
        this.error = 'لا يوجد معرف للمريض في الرابط';
        this.loading = false;
        return;
      }
      this.patientId = id;
      this.fetchPatient();
      this.loadReferrals();
    });
  }

  // 🟢 جلب بيانات المريض
  private fetchPatient() {
    this.loading = true;
    this.error = '';
    this.patientService.getById(this.patientId).subscribe({
      next: (res: any) => {
        const p = res?.data ?? res;
        if (!p) {
          this.error = 'لم يتم العثور على بيانات المريض.';
          this.loading = false;
          return;
        }
        this.patient = p;
        this.initForm(p);
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ خطأ في جلب بيانات المريض:', err);
        this.error = 'فشل في تحميل بيانات المريض';
        this.loading = false;
      }
    });
  }

  // 🟢 تهيئة فورم التعديل
  private initForm(p: any) {
    const doctor = Array.isArray(p?.doctor) ? p.doctor[0] : null;
    this.patientForm = this.fb.group({
      username: [p?.username ?? '', Validators.required],
      nationalId: [p?.nationalId ?? '', [Validators.required, Validators.minLength(14)]],
      age: [p?.age ?? null, [Validators.required, Validators.min(0)]],
      gender: [p?.gender ?? '', Validators.required],
      phone: [p?.phone ?? '', [Validators.required, Validators.minLength(10)]],
      address: [p?.address ?? '', Validators.required],
      diagnosis: [p?.diagnosis ?? '', Validators.required],
      doctorName: [doctor?.name ?? p?.doctorName ?? '', Validators.required],
      doctorSpecialization: [doctor?.specialization ?? p?.doctorSpecialization ?? '']
    });
  }

  // 🟢 تعديل البيانات
  toggleEdit() {
    this.editing = !this.editing;
    if (this.editing && this.patient) {
      this.initForm(this.patient);
    }
  }

  onUpdate() {
    if (this.patientForm.invalid) {
      this.patientForm.markAllAsTouched();
      return;
    }

    this.patientService.updatePatient(this.patientId, this.patientForm.value).subscribe({
      next: (res: any) => {
        const updated = res?.data ?? res;
        alert('✅ تم تحديث بيانات المريض بنجاح');
        this.patient = updated;
        this.toggleEdit();
      },
      error: (err) => {
        console.error('❌ خطأ في تحديث بيانات المريض:', err);
        alert('⚠️ فشل في تحديث بيانات المريض');
      }
    });
  }

  // 🟢 جلب إحالات المريض
  loadReferrals() {
    this.referralService.getReferrals().subscribe({
      next: (res: any) => {
        this.referrals = (res.data || res).filter((r: Referral) => r.patientId === this.patientId);
      },
      error: (err) => {
        console.error('❌ خطأ في جلب الإحالات:', err);
      }
    });
  }

  // 🟢 إظهار/إخفاء نموذج الإحالة
  toggleReferralForm() {
    this.showReferralForm = !this.showReferralForm;
  }
}
