import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-why-us',
  imports: [CommonModule],
  templateUrl: './why-us.component.html',
  styleUrl: './why-us.component.scss'
})
export class WhyUsComponent {
counters = [
  {
    number: 5000,
    title: 'المرضى',
    description: 'تمت إدارة أكثر من 5000 حالة مرضية عبر النظام.',
    icon: 'fa-hospital-user'
  },
  {
    number: 350,
    title: 'الأطباء',
    description: 'يضم النظام أكثر من 350 طبيب في مختلف التخصصات.',
    icon: 'fa-user-md'
  },
  {
    number: 120,
    title: 'الإحالات',
    description: 'تمت معالجة أكثر من 120 إحالة طبية بكفاءة وسرعة.',
    icon: 'fa-stethoscope'
  },
  {
    number: 25,
    title: 'الأقسام',
    description: 'النظام يغطي 25 قسمًا طبيًا وإداريًا داخل المستشفى.',
    icon: 'fa-building-medical'
  }
];

}
