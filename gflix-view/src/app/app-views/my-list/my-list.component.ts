import { Component, OnInit } from '@angular/core';
import { ListService } from '../../service/list.service';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '../../directives/directivesModule.module';
import { HttpClientModule } from '@angular/common/http';
import { GflixService } from '../../service/gflix.service';
import { ModalDetailsComponent } from '../../app-components/modal-details/modal-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-my-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, DirectivesModule, ModalDetailsComponent],
  providers: [ListService, GflixService],
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {


  favorites: any;

  uid = localStorage.getItem('uid');
  tokenList = localStorage.getItem('tokenList');
  sharedList = false;
  sharedTokenList: any;

  midiaDetails: any;

  constructor(private listService: ListService, private gflixService: GflixService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.sharedTokenList = params.get('tokenList');
      if (this.sharedTokenList) {
        this.loadSharedList(this.sharedTokenList);
        this.sharedList = true;
      } else {
        this.listService.getFavorites(this.uid, this.tokenList || "").then(data => {
          localStorage.setItem('tokenList', data[0].tokenList)
          this.tokenList = data[0].tokenList;
          this.favorites = data;
        });
      }
    });

  }

  async showDetails(midia: any) {
    if (midia.tipo == "MOVIE") {
      this.midiaDetails = await this.gflixService.getMovieById(midia.id, this.uid);
    } else {
      this.midiaDetails = await this.gflixService.getTvById(midia.id, this.uid);
    }
  }

  loadSharedList(tokenList: string) {
    this.listService.getFavorites("", tokenList).then(data => {
      this.favorites = data;
    });
  }

  setFavorite(midia: any) {
    var tokenList = localStorage.getItem('tokenList');
    var userId = localStorage.getItem('uid');

    var myListDTO = {
      tokenList: tokenList,
      movieId: midia.id,
      tvShowId: midia.id,
      userId: userId
    };
    if (midia.favorite) {
      this.listService.deleteItemList(myListDTO);
      this.favorites = this.favorites.filter((favorite: any) => favorite.id !== midia.id);
    } else {
      this.listService.setItemList(myListDTO).then((r) => {
        if (tokenList == null) {
          localStorage.setItem('tokenList', r.tokenList);
          midia.favorite = true;
        }
      });
    }
  }

  onModalClose(midiaDetails: any) {
    if (!this.sharedList) {
      this.favorites = this.favorites.filter((m: any) => !(m.id === midiaDetails.id && m.favorite !== midiaDetails.isFavorite));
    }
  }

  shareOnWhatsApp() {
    const url = encodeURIComponent(environment.siteUrl + "/sharedList/" + this.tokenList);
    const text = encodeURIComponent('Confira minha lista de filmes e séries!');
    window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, '_blank');
  }

  copyLink() {
    const url = environment.siteUrl + "/sharedList/" + this.tokenList;
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copiado para a área de transferência!');
    });
  }

}
