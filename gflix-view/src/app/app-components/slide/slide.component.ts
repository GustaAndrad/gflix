import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'swiper/swiper-bundle.css';
import { DirectivesModule } from '../../directives/directivesModule.module';


@Component({
  selector: 'app-slide',
  standalone: true,
  imports: [CommonModule, DirectivesModule],
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SlideComponent implements OnInit {

  @Input() midia:any;
  @Input() titulo:any;

  constructor() { }

  ngOnInit() {
  }

}
