import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GflixService } from '../../service/gflix.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import 'swiper/swiper-bundle.css';
import { DirectivesModule } from '../../directives/directivesModule.module';
import { SlideComponent } from '../../app-components/slide/slide.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, HttpClientModule, DirectivesModule, SlideComponent],
  providers: [GflixService],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MoviesComponent implements OnInit {

  movies: any;
  pageForMovies = 1;

  constructor(private service: GflixService) { }

  ngOnInit() {
    this.fetchMovies();
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

}
