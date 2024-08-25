import { Component, Input, input, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { SideBarComponent } from "../../shared/side-bar/side-bar.component";
import { RouterOutlet } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';
import { NgFor, SlicePipe } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { FavoriteService } from '../../core/services/favorite.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, SlicePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  movies: any[] = [];
  @Input() movie:any;

  constructor(
    private favoriteService: FavoriteService,
    private MovieService : MovieService,
    private AuthService: AuthService,
  ) {}




  ngOnInit(): void {
    this.MovieService.getMovies().subscribe(
      (data: any[]) => {
        this.movies = data;
      },
      (error) => {
        console.error('Error fetching movies', error);
      }
    );
  }


      // Método para agregar a favoritos
      addToFavorites(movieId: number): void {
        this.favoriteService.addFavorite(movieId).subscribe(
          response => {
            console.log('Added to favorites', response);
          },
          error => {
            console.error('Error adding to favorites', error);
          }
        );
      }

}
