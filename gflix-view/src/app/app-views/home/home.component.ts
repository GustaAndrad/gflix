import { Component, OnInit } from '@angular/core';
import { GflixService } from '../../service/gflix.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [GflixService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: any;
  tvShows: any;
  pageForMovies = 1;
  pageForTv = 1;

  constructor(private service: GflixService) { }

  ngOnInit() {
    this.fetchMovies();
    this.fetchTvShows();
  }

  async fetchMovies() {
    await this.service.getMovies(this.pageForMovies)
      .then(movies => {
        this.movies = movies;
      })
      .catch(error => {
        console.error('Erro ao buscar filmes:', error);
      });
  }

  async fetchTvShows() {
    await this.service.getTVShows(this.pageForTv)
      .then(tvShows => {
        this.tvShows = tvShows;
      })
      .catch(error => {
        console.error('Erro ao buscar tvShows:', error);
      });
  }

}
