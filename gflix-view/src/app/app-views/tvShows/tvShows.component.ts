import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GflixService } from '../../service/gflix.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import 'swiper/swiper-bundle.css';
import { DirectivesModule } from '../../directives/directivesModule.module';
import { SlideComponent } from '../../app-components/slide/slide.component';

@Component({
  selector: 'app-tvShows',
  standalone: true,
  imports: [CommonModule, HttpClientModule, DirectivesModule, SlideComponent],
  providers: [GflixService],
  templateUrl: './tvShows.component.html',
  styleUrls: ['./tvShows.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TvShowsComponent implements OnInit {

  tvShows: any;
  pageForTv = 1;

  constructor(private service: GflixService) { }

  ngOnInit() {
    this.fetchTvShows();
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
