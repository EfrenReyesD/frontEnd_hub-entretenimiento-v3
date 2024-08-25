import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';


import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Método para manejar el envío del formulario de login
  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.authService.login(credentials).subscribe({
        next: () => this.router.navigate(['/Dashboard']),
        error: (err) => console.error('Login error', err)
      });
    }
  }
}
