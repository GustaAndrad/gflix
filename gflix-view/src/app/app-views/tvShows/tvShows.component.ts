import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { GflixService } from '../../service/gflix.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import 'swiper/swiper-bundle.css';
import { SlideComponent } from '../../app-components/slide/slide.component';
import { ListService } from '../../service/list.service';
import { ModalDetailsComponent } from '../../app-components/modal-details/modal-details.component';
import { DirectivesModule } from '../../directives/directivesModule.module';
import { Subscription } from 'rxjs';
import { SearchService } from '../../service/search.service';

@Component({
  selector: 'app-tvShows',
  standalone: true,
  imports: [CommonModule, HttpClientModule, SlideComponent, ModalDetailsComponent, DirectivesModule],
  providers: [ListService, GflixService],
  templateUrl: './tvShows.component.html',
  styleUrls: ['./tvShows.component.css']
})
export class TvShowsComponent implements OnInit, OnDestroy {

  tvShows: any;
  pageForTvShows = 1;

  midiaDetails: any;

  uid = localStorage.getItem('uid');

  isLoading = false;

  searchQuery: string = '';
  private searchSubscription!: Subscription;

  constructor(private service: GflixService, private listService: ListService, private searchService: SearchService) { }

  ngOnInit() {
    this.fetchTvShows();
    this.searchSubscription = this.searchService.search$.subscribe(query => {
      this.searchQuery = query;
      if (this.searchQuery.trim() !== '' && !this.isLoading) {
        try {
          this.isLoading = true;
          this.searchTv(this.searchQuery);
        } catch (error) {
          console.error(error);
        } finally {
          this.isLoading = false;
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  async fetchTvShows() {
    this.isLoading = true;
    try {
      await this.service.getTVShows(this.pageForTvShows, localStorage.getItem('uid'))
        .then(tvShows => {
          if (!this.tvShows) {
            this.tvShows = tvShows;
          } else {
            this.tvShows = [...this.tvShows, ...tvShows];
          }
        })
        .catch(error => {
          console.error('Erro ao buscar series:', error);
        });
    } catch (error) {
      console.error('Erro ao buscar series')
    } finally {
      this.isLoading = false;
    }
  }

  searchTv(searchQuery: string) {
    this.pageForTvShows = 1;
    this.service.getMovieBySearch(searchQuery, this.pageForTvShows, this.uid).then(r => {
      this.tvShows = r;
    });
  }

  setFavorite(midia: any, index: number) {
    var tokenList = localStorage.getItem('tokenList');
    var userId = localStorage.getItem('uid');

    var myListDTO = {
      tokenList: tokenList,
      movieId: null,
      tvShowId: midia.id,
      userId: userId,
      tipo: midia.tipo
    };
    if (midia.favorite) {
      this.listService.deleteItemList(myListDTO);
      this.tvShows[index].favorite = !midia.favorite;
    } else {
      this.listService.setItemList(myListDTO).then((r) => {
        if (tokenList == null) {
          localStorage.setItem('tokenList', r.tokenList);
        }
        this.tvShows[index].favorite = !midia.favorite;
      });
    }
  }

  async showDetails(midia: any) {
    if (midia.tipo == "MOVIE") {
      this.midiaDetails = await this.service.getMovieById(midia.id, this.uid);
    } else {
      this.midiaDetails = await this.service.getTvById(midia.id, this.uid);
    }
  }

  onModalClose(midiaDetails: any) {
    const midia = this.tvShows.find((m: { id: any; }) => m.id === midiaDetails.id);
    if (midia) {
      midia.favorite = midiaDetails.isFavorite;
    }
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
      this.loadMoreTvShows();
    }
  }

  loadMoreTvShows() {
    if (!this.isLoading) {
      this.pageForTvShows++;
      this.fetchTvShows();
    }
  }

}
