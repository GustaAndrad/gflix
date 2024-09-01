import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { GflixService } from '../../service/gflix.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import 'swiper/swiper-bundle.css';
import { SlideComponent } from '../../app-components/slide/slide.component';
import { ModalDetailsComponent } from '../../app-components/modal-details/modal-details.component';
import { ListService } from '../../service/list.service';
import { DirectivesModule } from '../../directives/directivesModule.module';
import { Subscription } from 'rxjs';
import { SearchService } from '../../service/search.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, HttpClientModule, SlideComponent, ModalDetailsComponent, DirectivesModule],
  providers: [ListService, GflixService],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit, OnDestroy {

  movies: any;
  pageForMovies = 1;

  midiaDetails: any;

  uid = localStorage.getItem('uid');

  isLoading = false;

  searchQuery: string = '';
  private searchSubscription!: Subscription;

  constructor(private service: GflixService, private listService: ListService, private searchService: SearchService) { }

  ngOnInit() {
    this.fetchMovies();
    this.searchSubscription = this.searchService.search$.subscribe(query => {
      this.searchQuery = query;
      if (this.searchQuery.trim() !== '' && !this.isLoading) {
        try {
          this.isLoading = true;
          this.searchMovies(this.searchQuery);
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

  searchMovies(searchQuery: string) {
    this.pageForMovies = 1;
    this.service.getMovieBySearch(searchQuery, this.pageForMovies, this.uid).then(r => {
      this.movies = r;
    });
  }

  async fetchMovies() {
    this.isLoading = true;
    try {
      await this.service.getMovies(this.pageForMovies, localStorage.getItem('uid'))
        .then(movies => {
          if (!this.movies) {
            this.movies = movies;
          } else {
            this.movies = [...this.movies, ...movies];
          }
        })
        .catch(error => {
          console.error('Erro ao buscar filmes:', error);
        });
    } catch (error) {
      console.error('Erro ao buscar filmes')
    } finally {
      this.isLoading = false;
    }
  }

  setFavorite(midia: any, index: number) {
    var tokenList = localStorage.getItem('tokenList');
    var userId = localStorage.getItem('uid');

    var myListDTO = {
      tokenList: tokenList,
      movieId: midia.id,
      tvShowId: null,
      userId: userId,
      tipo: midia.tipo
    };
    if (midia.favorite) {
      this.listService.deleteItemList(myListDTO);
      this.movies[index].favorite = !midia.favorite;
    } else {
      this.listService.setItemList(myListDTO).then((r) => {
        if (tokenList == null) {
          localStorage.setItem('tokenList', r.tokenList);
        }
        this.movies[index].favorite = !midia.favorite;
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
    const midia = this.movies.find((m: { id: any; }) => m.id === midiaDetails.id);
    if (midia) {
      midia.favorite = midiaDetails.isFavorite;
    }
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
      this.loadMoreMovies();
    }
  }

  loadMoreMovies() {
    if (!this.isLoading) {
      this.pageForMovies++;
      this.fetchMovies();
    }
  }

}
