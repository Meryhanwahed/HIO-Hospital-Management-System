import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReferralService } from '../../services/referral.service';

@Component({
  selector: 'app-referral-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './referral-form.component.html',
  styleUrls: ['./referral-form.component.scss']
})
export class ReferralFormComponent {
@Input({ required: true }) patientId: string | null | undefined;
  @Output() referralCreated = new EventEmitter<void>(); // 🟢 يبعث حدث عند نجاح الحفظ

  referralForm: FormGroup;
  message = '';
  error = '';
  loading = false;

  constructor(private fb: FormBuilder, private referralService: ReferralService) {
    this.referralForm = this.fb.group({
      referralToSection: ['', Validators.required],
      reasonForReferral: ['', Validators.required],
      referralTo: ['', Validators.required],
    });
  }

  onSubmit() {
  if (this.referralForm.invalid || !this.patientId) return;

  this.loading = true;
  this.referralService.createReferral(this.patientId, this.referralForm.value).subscribe({
    next: () => {
      this.message = '✅ تم إنشاء الإحالة بنجاح';
      this.error = '';
      this.referralForm.reset();
      this.loading = false;

      // إشعار الأب بإنشاء الإحالة
      this.referralCreated.emit();
    },
    error: (err) => {
      console.error('❌ خطأ في إنشاء الإحالة:', err);
      this.error = '⚠️ حدث خطأ أثناء إنشاء الإحالة، حاول مرة أخرى';
      this.loading = false;
    }
  });
}
}