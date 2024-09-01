import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DirectivesModule } from '../../directives/directivesModule.module';
import { GflixService } from '../../service/gflix.service';
import { ListService } from '../../service/list.service';

@Component({
  selector: 'app-modal-details',
  standalone: true,
  imports: [CommonModule, DirectivesModule],
  providers: [ListService, GflixService],
  templateUrl: './modal-details.component.html',
  styleUrls: ['./modal-details.component.css']
})
export class ModalDetailsComponent implements OnInit {

  @Input() midiaDetails: any;

  constructor(private listService: ListService, private gflixService: GflixService) { }

  ngOnInit() {
  }
  setFavorite() {
    var tokenList = localStorage.getItem('tokenList');
    var userId = localStorage.getItem('uid');

    var myListDTO = {
      tokenList: tokenList,
      movieId: this.midiaDetails.id,
      tvShowId: this.midiaDetails.id,
      userId: userId
    };

    if (this.midiaDetails.isFavorite) {
      this.listService.deleteItemList(myListDTO);
      this.midiaDetails.isFavorite = false;
    } else {
      this.listService.setItemList(myListDTO).then((r) => {
        if (tokenList == null) {
          localStorage.setItem('tokenList', r.tokenList);
        }
        this.midiaDetails.isFavorite = true;
      });
    }
  }

  closeDetails() {
    this.midiaDetails = null;
  }

  closeModal(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.closeDetails();
    }
  }
}
