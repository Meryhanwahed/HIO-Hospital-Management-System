import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
interface StatCard {
  title: string;
  value: number;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  stats: StatCard[] = [
    { title: 'عدد المرضى', value: 128, icon: '👨‍⚕️', color: '#1976d2' },
    { title: 'عدد الأطباء', value: 42, icon: '🧑‍⚕️', color: '#388e3c' },
    { title: 'عدد الملفات الطبية', value: 310, icon: '📂', color: '#f57c00' },
    { title: 'الإحالات', value: 25, icon: '🔄', color: '#7b1fa2' }
  ];

}
