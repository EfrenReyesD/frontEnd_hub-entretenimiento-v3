import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  // Validador personalizado para comprobar si las contraseñas coinciden
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const { email, password } = this.registerForm.value;

    this.authService.register({ email, password }).subscribe(
      response => {
        this.successMessage = 'User registered successfully!';
        this.errorMessage = null;
        this.registerForm.reset();
        console.log('hola', response);
      },
      error => {
        this.successMessage = null;
        this.errorMessage = 'Registration failed. Please try again.';
        console.log('Registration error:', error)
      }
    );
  }
}
