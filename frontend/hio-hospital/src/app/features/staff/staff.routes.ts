import { Routes } from '@angular/router';
import { StaffListComponent } from './pages/staff-list/staff-list.component';
import { StaffFormComponent } from './pages/staff-form/staff-form.component';

export const STAFF_ROUTES: Routes = [
  { path: '', component: StaffListComponent },
  { path: 'new', component: StaffFormComponent }
];
