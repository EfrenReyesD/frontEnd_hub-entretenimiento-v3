import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { decode } from 'punycode';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = 'http://localhost:5286/api/Favorites'; // Cambia esta URL según tu configuración

  constructor(private http: HttpClient, private authService: AuthService) {}

  addFavorite(movieId?: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const body = { movieId};



    function decodeJWT(token: string): any {
      // Divide el token en partes
      const parts = token.split('.');

      // Verifica que el token tiene al menos 3 partes
      if (parts.length !== 3) {
        throw new Error('Invalid JWT token');
      }

      // El payload está en la segunda parte del token
      const payload = parts[1];

      // Decodifica el payload de base64url a texto
      const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));

      // Convierte el texto JSON en un objeto
      return JSON.parse(decodedPayload);
    }

    // Uso de la función
    if (token) {
      try {
        const decoded = decodeJWT(token);
        const userId = decoded.id; // Asegúrate de usar el campo correcto del payload
        console.log(decode);
        console.log('User ID:', userId);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }







    console.log(token)



    return this.http.post(this.apiUrl, body, { headers });
  }
}
