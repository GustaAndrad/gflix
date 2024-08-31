import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'swiper/swiper-bundle.css';
import { DirectivesModule } from '../../directives/directivesModule.module';
import { ListService } from '../../service/list.service';


@Component({
  selector: 'app-slide',
  standalone: true,
  imports: [CommonModule, DirectivesModule],
  providers: [ListService],
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SlideComponent implements OnInit {

  @Input() midias: any;
  @Input() titulo: any;

  constructor(private listService: ListService) { }

  ngOnInit() { }

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
