// src/app/core/services/movie.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:5286/api/Movie'; // Cambia esto a la URL de tu API
  private apiFav = 'http://localhost:5286/api';
  constructor(private http: HttpClient) { }

  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addToFavorites(movieId: number): Observable<any> {
    const body = {movieId };
    return this.http.post(`${this.apiFav}/Favorite`, body);
  }
}
