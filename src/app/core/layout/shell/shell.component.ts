import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { AuthService } from '../../services/auth.service';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
  showPatients = false;
  showReferrals = false;
    showDoctors = false;   // ✅ متغير للقائمة


  constructor(private auth: AuthService, private router: Router) {}

  togglePatients() {
    this.showPatients = !this.showPatients;
  }

  toggleReferrals() {
    this.showReferrals = !this.showReferrals;
  }

  toggleDoctors() {   // ✅ نفس الاسم اللي في HTML
    this.showDoctors = !this.showDoctors;
  }
  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
