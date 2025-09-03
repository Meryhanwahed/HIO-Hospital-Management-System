import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DoctorService, Doctor } from '../../services/doctor.service';

@Component({
  selector: 'app-doctor-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.scss']
})
export class DoctorDetailsComponent implements OnInit {
  doctor?: Doctor;
  loading = true;
  error = '';

  constructor(private route: ActivatedRoute, private doctorService: DoctorService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = '⚠️ لا يوجد معرف للطبيب في الرابط';
      this.loading = false;
      return;
    }

    this.doctorService.getDoctorById(id).subscribe({
      next: (res: any) => {
        this.doctor = res.data || res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = '⚠️ فشل تحميل بيانات الطبيب';
        this.loading = false;
      }
    });
  }
}
