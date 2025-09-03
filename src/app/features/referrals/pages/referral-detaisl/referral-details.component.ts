import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ReferralService, Referral } from '../../services/referral.service';

@Component({
  selector: 'app-referral-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './referral-details.component.html',
  styleUrls: ['./referral-details.component.scss']
})
export class ReferralDetailsComponent implements OnInit {
  referral?: Referral;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private referralService: ReferralService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) {
        this.error = '⚠️ لا يوجد معرف إحالة في الرابط';
        this.loading = false;
        return;
      }
      this.fetchReferral(id);
    });
  }

  private fetchReferral(id: string) {
    this.loading = true;
    this.referralService.getReferralById(id).subscribe({
      next: (res: any) => {
        this.referral = res?.data ?? res;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ خطأ في جلب الإحالة:', err);
        this.error = '⚠️ فشل في تحميل بيانات الإحالة';
        this.loading = false;
      }
    });
  }
}
