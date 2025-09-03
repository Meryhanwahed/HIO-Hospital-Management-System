import { Routes } from '@angular/router';
import { PatientListComponent } from './pages/patient-list/patient-list.component';
import { PatientFormComponent } from './pages/patient-form/patient-form.component';
import { PatientDetailsComponent } from './pages/patient-details/patient-details.component';

export const PATIENTS_ROUTES: Routes = [
  { path: 'list', component: PatientListComponent },
  { path: 'new', component: PatientFormComponent },
  { path: ':id', component: PatientDetailsComponent },
  { path: ':id/edit', component: PatientFormComponent },
];
