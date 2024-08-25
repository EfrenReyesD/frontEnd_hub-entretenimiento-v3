import { Component, Input, OnInit } from '@angular/core';
import { FavoriteService } from '../../core/services/favorite.service';
import { MovieService } from '../../core/services/movie.service';
import { NgFor, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-pelicula-list',
  standalone: true,
  imports: [NgFor, SlicePipe],
  templateUrl: './pelicula-list.component.html',
  styleUrl: './pelicula-list.component.css'
})
export class PeliculaListComponent implements OnInit{
  movies: any[] = [];
  @Input() movie:any;

  constructor(
    private favoriteService: FavoriteService,
    private MovieService : MovieService,
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
}
