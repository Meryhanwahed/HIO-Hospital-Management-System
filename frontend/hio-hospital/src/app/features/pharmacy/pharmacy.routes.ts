import { Routes } from '@angular/router';
import { DrugListComponent } from './pages/drug-list/drug-list.component';
import { DrugFormComponent } from './pages/drug-form/drug-form.component';

export const PHARMACY_ROUTES: Routes = [
  { path: '', component: DrugListComponent },
  { path: 'new', component: DrugFormComponent }
];
