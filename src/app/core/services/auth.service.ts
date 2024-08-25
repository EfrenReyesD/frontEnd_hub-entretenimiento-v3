import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5286/api/User'; // Set this to your actual backend URL

    // Método para obtener la URL completa de registro
    getRegisterUrl(): string {
      return `${this.apiUrl}/register`;
    }
    getLoginUrl(): string {
      return `${this.apiUrl}/login`;
    }
  constructor(private http: HttpClient) {}

  //Metodo para registrar un nuevo usuario
  register(user: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  //Metodo para inciciar sesion
  login(credentials: { email: string, password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials).pipe(
      //tap(response => this.saveToken(response.token))
      tap(response => {
        if (response?.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  //Metodo para guardar el token JWT en el localStorage
  private saveToken(token: string): void {
    localStorage.setItem('jwt_token', token);
  }

  // Opcionales, para obtener el token JWT
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  // Optionally, you can add a method to remove the token (for logout)
  logout(): void {
    localStorage.removeItem('jwt_token');
  }

  // Verifica si se está ejecutando en el cliente
  private isBrowser() {
    return typeof window !== 'undefined';
  }

  isAuthenticated(): boolean {
    if (this.isBrowser()) {
      return !!localStorage.getItem('token');
    }
    return false;
  }


}
