import { Routes } from '@angular/router';
import { ShellComponent } from './core/layout/shell/shell.component';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { LandingComponent } from './core/layout/landing/landing.component'; // ✅ استيراد صفحة اللاندنج
import { FeatureComponent } from './core/layout/landing/feature/feature.component';

export const routes: Routes = [
    { path: 'feature', component: FeatureComponent },

  // 🔹 صفحة اللاندنج للزوار
  { path: 'landing', component: LandingComponent },

  // 🔹 صفحات الدخول والتسجيل
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },

  // 🔹 الافتراضي يوجه للـ landing
  { path: '', redirectTo: '/landing', pathMatch: 'full' },

  // 🔹 تحميل lazy للـ Auth module
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },

  // 🔹 الصفحات بعد تسجيل الدخول فقط
  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes').then(
            (m) => m.DASHBOARD_ROUTES
          ),
      },
      {
        path: 'patients',
        loadChildren: () =>
          import('./features/patients/patients.routes').then(
            (m) => m.PATIENTS_ROUTES
          ),
      },
      {
        path: 'doctors',
        loadChildren: () =>
          import('./features/doctors/doctors.routes').then(
            (m) => m.DOCTORS_ROUTES
          ),
      },
      {
        path: 'referrals',
        loadChildren: () =>
          import('./features/referrals/referrals.routes').then(
            (m) => m.REFERRALS_ROUTES
          ),
      },
      {
        path: 'files',
        loadChildren: () =>
          import('./features/files/files.routes').then((m) => m.FILES_ROUTES),
      },
      {
        path: 'pharmacy',
        loadChildren: () =>
          import('./features/pharmacy/pharmacy.routes').then(
            (m) => m.PHARMACY_ROUTES
          ),
      },
      {
        path: 'staff',
        loadChildren: () =>
          import('./features/staff/staff.routes').then((m) => m.STAFF_ROUTES),
      },

      // 🔹 الافتراضي جوه السيستم بعد تسجيل الدخول
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  // 🔹 أي مسار غير معروف يرجع للـ landing
  { path: '**', redirectTo: '/landing' },
];
