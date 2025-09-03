import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferralService, Referral } from '../../services/referral.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-referral-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './referral-list.component.html',
  styleUrls: ['./referral-list.component.scss']
})
export class ReferralListComponent implements OnInit {
[x: string]: any;
  referrals: Referral[] = [];
  loading = true;
  error = '';

  constructor(private referralService: ReferralService) {}

  ngOnInit() {
    this.referralService.getReferrals().subscribe({
      next: (res: any) => {
        console.log('📥 الإحالات:', res);
        this.referrals = res.data || res; // حسب الـ response من السيرفر
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ خطأ في جلب الإحالات:', err);
        this.error = 'فشل تحميل الإحالات';
        this.loading = false;
      }
    });
  }

  }
