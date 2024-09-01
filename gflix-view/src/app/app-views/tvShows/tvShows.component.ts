import { Component, OnInit } from '@angular/core';
import { GflixService } from '../../service/gflix.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import 'swiper/swiper-bundle.css';
import { SlideComponent } from '../../app-components/slide/slide.component';

@Component({
  selector: 'app-tvShows',
  standalone: true,
  imports: [CommonModule, HttpClientModule, SlideComponent],
  providers: [GflixService],
  templateUrl: './tvShows.component.html',
  styleUrls: ['./tvShows.component.css']
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
