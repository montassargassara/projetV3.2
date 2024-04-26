import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../_services/loginService/auth.service';
import { TokenStorageService } from '../../_services/loginService/token-storage.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  signUpObj: any = {
    name: null,
    email: null,
    password: null
  };
  loginObj: any = {
    email: null,
    password: null
  };
  isSignDivVisible = false;
  isLoggedIn = false;
  isLoginFailed = false;
  isSuccessful = false; // Add this line
  isSignUpFailed = false; // Add this line
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onRegister(): void {
    const { name, email, password } = this.signUpObj;
    this.authService.register(name, email, password).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.isSignDivVisible = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  onLogin(): void {
    const { email, password } = this.loginObj;
    this.authService.login(email, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        console.log(this.tokenStorage)
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.router.navigateByUrl('/home');
        console.log(this.router)
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (this.isSignDivVisible) {
        // Si le formulaire d'inscription est visible, cliquez sur le bouton d'inscription
        const registerButton = document.getElementById('register-button');
        registerButton?.click();
      } else {
        // Sinon, cliquez sur le bouton de connexion
        const signInButton = document.getElementById('sign-in-button');
        signInButton?.click();
      }
    }
  }
}
