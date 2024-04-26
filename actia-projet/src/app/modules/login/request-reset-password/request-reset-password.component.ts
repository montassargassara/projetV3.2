import { Component } from '@angular/core';
import { AuthService } from '../../../_services/loginService/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,  // Add FormsModule here
    HttpClientModule  // Add HttpClientModule here
  ],
  templateUrl: './request-reset-password.component.html',
  styleUrl: './request-reset-password.component.scss'
})
export class RequestResetPasswordComponent {
  email: string = '';
  message: string = '';

  constructor(private authService: AuthService) {}

 
  onSubmit() {
    if (this.email) {
      this.authService.requestResetPassword(this.email).subscribe({
        next: (response) => {
          console.log('Reset password link sent!');
        },
        error: (error) => {
          console.error('Reset request error:', error);
        }
      });
    }
  }
}
