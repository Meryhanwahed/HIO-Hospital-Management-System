import { Routes } from '@angular/router';
import { ReferralListComponent } from './pages/referral-list/referral-list.component';
import { ReferralFormComponent } from './pages/referral-form/referral-form.component';
import {ReferralDetailsComponent} from './pages/referral-detaisl/referral-details.component';
export const REFERRALS_ROUTES: Routes = [
  { path: 'list', component: ReferralListComponent },  // /referrals/list
  { path: 'new', component: ReferralFormComponent } ,  // /referrals/new
  {path: ':id',component: ReferralDetailsComponent}
];
