import { Component } from '@angular/core';

@Component({
  selector: 'pretty-slider-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PrettySliderLibrary';

  public steps: number = 10;
  public tooltips: string = 'close';
  public interval: number = 20;
  public rangeValue: number[] = [14320, 80400];

  onDragMoved(object: any) {
    console.log(object);
  }
}
