import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'swiper/swiper-bundle.css';
import { DirectivesModule } from '../../directives/directivesModule.module';
import { ListService } from '../../service/list.service';
import { GflixService } from '../../service/gflix.service';
import { ModalDetailsComponent } from '../modal-details/modal-details.component';
import { SwiperOptions } from 'swiper/types';


@Component({
  selector: 'app-slide',
  standalone: true,
  imports: [CommonModule, DirectivesModule, ModalDetailsComponent,],
  providers: [ListService, GflixService],
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SlideComponent implements OnInit {

  @Input() midias: any;
  @Input() titulo: any;

  midiaDetails: any;

  uid = localStorage.getItem('uid');

  breakpoints: SwiperOptions['breakpoints'] = {
    320: {
      slidesPerView: 3.2,
    },
    480: {
      slidesPerView: 4.5,
    },
    768: {
      slidesPerView: 4.5,
    },
    1024: {
      slidesPerView: 5.5,
    },
    1440: {
      slidesPerView: 8.5,
    }
  } || 3.5;

  constructor(private listService: ListService, private gflixService: GflixService) { }

  ngOnInit() { }

  setFavorite(midia: any, index: number) {
    var tokenList = localStorage.getItem('tokenList');
    var userId = localStorage.getItem('uid');

    var myListDTO = {
      tokenList: tokenList,
      movieId: midia.id,
      tvShowId: midia.id,
      userId: userId,
      tipo: midia.tipo
    };
    if (midia.favorite) {
      this.listService.deleteItemList(myListDTO);
      this.midias[index].favorite = !midia.favorite;
    } else {
      this.listService.setItemList(myListDTO).then((r) => {
        if (tokenList == null) {
          localStorage.setItem('tokenList', r.tokenList);
        }
        this.midias[index].favorite = !midia.favorite;
      });
    }
  }

  async showDetails(midia: any) {
    if (midia.tipo == "MOVIE") {
      this.midiaDetails = await this.gflixService.getMovieById(midia.id, this.uid);
    } else {
      this.midiaDetails = await this.gflixService.getTvById(midia.id, this.uid);
    }
  }

  onModalClose(midiaDetails: any) {
    const midia = this.midias.find((m: { id: any; }) => m.id === midiaDetails.id);
    if (midia) {
      midia.favorite = midiaDetails.isFavorite;
    }
  }


}
