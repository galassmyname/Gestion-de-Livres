import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  email = '';
  password = '';
  registerEmail = '';
  registerPassword = '';
  errorMessage = '';
  successMessage = '';
  isLoginMode = true; // Pour basculer entre login/register

  constructor(private authService: AuthService, private router: Router) { }

  // Connexion
  onSubmit() {
    const credentials = { email: this.email, password: this.password };
    this.authService.login(credentials).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/book-list']);
      },
      (error) => {
        this.errorMessage = 'Échec de la connexion';
      }
    );
  }

  // Inscription
  onRegister() {
    const user = { 
      email: this.registerEmail, 
      password: this.registerPassword 
    };
    this.authService.register(user).subscribe(
      (response: any) => {
        this.successMessage = 'Inscription réussie! Vous pouvez vous connecter.';
        this.isLoginMode = true; // Rebasculer sur le formulaire de login
        this.registerEmail = '';
        this.registerPassword = '';
      },
      (error) => {
        this.errorMessage = "Échec de l'inscription";
      }
    );
  }

  // Basculer entre login/register
  switchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
    this.successMessage = '';
  }
}