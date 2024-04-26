import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../_services/loginService/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-reset-password',
    standalone: true,
    template: `
    <form (ngSubmit)="submit()">
      <input type="password" [(ngModel)]="newPassword" name="newPassword" required>
      <button type="submit">Reset Password</button>
    </form>
  `,
    styleUrl: './reset-password.component.scss',
    imports: [
        RouterLink,
        CommonModule,
        FormsModule, // Add FormsModule here
        HttpClientModule // Add HttpClientModule here
        ,
    ]
})
export class ResetPasswordComponent {
  newPassword: string = '';
  token: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    console.log("Token from URL:", this.token); // Afficher le token pour vérification
  }
  

  submit(): void {
    if (!this.token || this.token.trim() === '') {
      alert('Token is required');
      return; // Arrête l'exécution si le token est vide
    }
    this.authService.resetPassword(this.token, this.newPassword).subscribe({
      next: response => {
        alert('Password updated successfully.');
        this.router.navigate(['/login']); // Redirection après la mise à jour réussie
      },
      error: error => {
        console.error('Error resetting password:', error);
        alert('Error resetting password');
      }
    });
  }
  
  
}