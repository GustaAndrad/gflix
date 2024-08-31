import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GflixService } from '../../service/gflix.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import 'swiper/swiper-bundle.css';
import { DirectivesModule } from '../../directives/directivesModule.module';
import { SlideComponent } from '../../app-components/slide/slide.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, DirectivesModule, SlideComponent],
  providers: [GflixService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
    await this.service.getMovies(this.pageForMovies, localStorage.getItem('uid'))
      .then(movies => {
        this.movies = movies;
      })
      .catch(error => {
        console.error('Erro ao buscar filmes:', error);
      });
  }

  async fetchTvShows() {
    await this.service.getTVShows(this.pageForTv, localStorage.getItem('uid'))
      .then(tvShows => {
        this.tvShows = tvShows;
      })
      .catch(error => {
        console.error('Erro ao buscar tvShows:', error);
      });
  }

}
