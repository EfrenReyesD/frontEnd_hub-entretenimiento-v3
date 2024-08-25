import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from '../../core/services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        LoginComponent // Moved to imports array
      ],
      providers: [FormBuilder, AuthService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form with email and password controls', () => {
    expect(component.loginForm.contains('email')).toBeTrue();
    expect(component.loginForm.contains('password')).toBeTrue();
  });

  it('should require email and password fields', () => {
    const emailControl = component.loginForm.get('email');
    const passwordControl = component.loginForm.get('password');

    emailControl?.setValue('');
    passwordControl?.setValue('');

    expect(emailControl?.valid).toBeFalse();
    expect(passwordControl?.valid).toBeFalse();
  });

  it('should call AuthService.login() and navigate to Dashboard on successful login', () => {
    const credentials = { email: 'test@example.com', password: 'password123' };
    const loginSpy = spyOn(authService, 'login').and.returnValue(of({ token: 'mock-token' }));
    const navigateSpy = spyOn(router, 'navigate');

    component.loginForm.setValue(credentials);
    component.onSubmit();

    expect(loginSpy).toHaveBeenCalledWith(credentials);
    expect(navigateSpy).toHaveBeenCalledWith(['/Dashboard']);
  });

  it('should handle login errors', () => {
    const credentials = { email: 'test@example.com', password: 'password123' };
    const loginSpy = spyOn(authService, 'login').and.returnValue(throwError(() => new Error('Login error')));
    const consoleSpy = spyOn(console, 'error');

    component.loginForm.setValue(credentials);
    component.onSubmit();

    expect(loginSpy).toHaveBeenCalledWith(credentials);
    expect(consoleSpy).toHaveBeenCalledWith('Login error', jasmine.any(Error));
  });
});
