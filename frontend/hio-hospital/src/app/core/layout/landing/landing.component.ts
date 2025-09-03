import { Component } from '@angular/core';
import { FooterComponent } from "./footer/footer.component";
import { WhyUsComponent } from "./why-us/why-us.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { HeroComponent } from "./hero/hero.component";
import { FeatureComponent } from "./feature/feature.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [FooterComponent, WhyUsComponent, ContactUsComponent, HeroComponent, FeatureComponent,CommonModule , RouterModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
