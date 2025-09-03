import { Routes } from '@angular/router';
import { DoctorListComponent } from './pages/doctor-list/doctor-list.component';
import { DoctorDetailsComponent } from './pages/doctor-details/doctor-details.component';
import { DoctorAddComponent } from './pages/doctor-add/doctor-add.component';


export const DOCTORS_ROUTES: Routes = [
  { path: 'list', component: DoctorListComponent },        // 📋 قائمة الأطباء
  { path: 'add', component: DoctorAddComponent },         // ➕ إضافة طبيب
  { path: ':id', component: DoctorDetailsComponent },      // 👁 تفاصيل طبيب
];
