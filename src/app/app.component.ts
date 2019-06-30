import { Component } from '@angular/core';

@Component({
  selector: 'pretty-slider-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PrettySliderLibrary';

  onDragMoved(object: any) {
    console.log(object);
  }
}
