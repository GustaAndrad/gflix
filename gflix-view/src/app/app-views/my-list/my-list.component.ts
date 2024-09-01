import { Component, OnInit } from '@angular/core';
import { ListService } from '../../service/list.service';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '../../directives/directivesModule.module';
import { HttpClientModule } from '@angular/common/http';
import { GflixService } from '../../service/gflix.service';
import { ModalDetailsComponent } from '../../app-components/modal-details/modal-details.component';

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

  midiaDetails: any;

  constructor(private listService: ListService, private gflixService: GflixService) { }

  ngOnInit() {
    this.listService.getFavorites(this.uid, this.tokenList).then(data => {
      this.favorites = data;
    });
  }

  async showDetails(midia: any) {
    this.midiaDetails = await this.gflixService.getMovieById(midia, this.uid);
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

}
