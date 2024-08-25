// auth.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  // Configuración inicial antes de cada prueba
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // Limpieza después de cada prueba
  afterEach(() => {
    httpMock.verify();
  });

  // Prueba para el método register
  it('should register a user', () => {
    const user = { email: 'test@example.com', password: 'password123' };
    const dummyResponse = { message: 'User registered successfully' };

    service.register(user).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(service.getRegisterUrl());
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });

  // Prueba para el método login
  it('should log in a user and store the token', () => {
    const credentials = { email: 'test@example.com', password: 'password123' };
    const dummyToken = { token: 'dummy-token' };

    spyOn(localStorage, 'setItem'); // Espía la llamada a localStorage.setItem

    service.login(credentials).subscribe(response => {
      expect(response.token).toBe('dummy-token');
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'dummy-token');
    });

    const req = httpMock.expectOne(service.getLoginUrl());
    expect(req.request.method).toBe('POST');
    req.flush(dummyToken);
  });

  // Prueba para el método getToken
  it('should get the token from localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('dummy-token');
    expect(service.getToken()).toBe('dummy-token');
  });

  // Prueba para el método isLoggedIn
  it('should return true if a token is present', () => {
    spyOn(localStorage, 'getItem').and.returnValue('dummy-token');
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should return false if no token is present', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(service.isLoggedIn()).toBeFalse();
  });

  // Prueba para el método logout
  it('should remove the token from localStorage', () => {
    spyOn(localStorage, 'removeItem');
    service.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith('jwt_token');
  });
});
