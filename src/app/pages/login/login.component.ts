import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  error: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Si ya está autenticado, redirigir al dashboard
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.error = null;

    const credentials = {
      email: this.email?.value,
      password: this.password?.value
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        // Guardar el token
        localStorage.setItem('token', response.access_token);
        
        // Obtener información del usuario
        this.authService.getCurrentUser().subscribe({
          next: (user) => {
            localStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            this.error = 'Error al obtener información del usuario';
            this.isLoading = false;
          }
        });
      },
      error: (error) => {
        this.error = error.error?.message || 'Error al iniciar sesión';
        this.isLoading = false;
      }
    });
  }
}