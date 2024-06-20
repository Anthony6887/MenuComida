import { Component, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './raiting-star.component.html',
  styleUrls: ['./raiting-star.component.css']

})

export class RaitingStarComponent implements OnChanges {
  @Input() rating!:number;

  startWidth!: number;
  constructor() {

  }
  ngOnChanges(): void {
    this.startWidth = this.rating * 97 / 5;
  }



}
