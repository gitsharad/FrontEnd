import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-industrycarousel',
  templateUrl: './industrycarousel.component.html',
  styleUrls: ['./industrycarousel.component.css'],
  providers: [NgbCarouselConfig]
})
export class IndustrycarouselComponent implements OnInit {
  showNavigationArrows = false;
  showNavigationIndicators = false;
  constructor(carouselConfig: NgbCarouselConfig) {
    carouselConfig.interval = 0;
    carouselConfig.wrap = true;
    carouselConfig.keyboard = true;
  }

  ngOnInit() {
  }
  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

}
