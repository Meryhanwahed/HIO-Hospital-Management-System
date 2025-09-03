import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-contact-us',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
name = '';
  email = '';
  phone = '';
  message = '';

  submitForm() {
    console.log('Form submitted:', { name: this.name, email: this.email, phone: this.phone, message: this.message });
  }
}
