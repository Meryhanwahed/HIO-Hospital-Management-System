import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorService, Doctor } from '../../services/doctor.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent implements OnInit {
  doctors: Doctor[] = [];
  loading = true;
  error = '';

  constructor(private doctorService: DoctorService) {}

  ngOnInit() {
    this.doctorService.getAllDoctors().subscribe({
      next: (res: any) => {
        this.doctors = res.data || res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = '⚠️ فشل تحميل الأطباء';
        this.loading = false;
      }
    });
  }
}
