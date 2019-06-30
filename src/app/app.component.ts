import { Component } from '@angular/core';

@Component({
  selector: 'pretty-slider-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PrettySliderLibrary';

  // grade = 0;
  // maxRating = 5;
  // showRatingCounter = true;
  // myRating: number;

  onDragMoved(object: any) {
    console.log(object);
  }

  onDragMouse(object: any) {
    console.log(object);
  }
  // selectedRating(rate: number) {
  //   console.log('your rating is');
  //   console.log(rate);
  //   this.myRating = rate;
  // }
}
