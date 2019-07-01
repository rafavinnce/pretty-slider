# PrettySlider

Simple and pretty highly customizable Angular slider.

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.0.

> This angular component library is planned to extends default angular slider and add mor slider handlers into the component.

For now, one component is added in this library
```html
<pretty-slider 
[steps]="steps" 
[tooltips]="tooltips" 
[value]="rangeValue" 
[interval]="interval" 
(dragMoved)="onDragMoved($event)" class="blue">
</pretty-slider>
```

# How to use?

* Include our ```pretty-slider``` module in ```app.module.ts```
```javascript
import { PrettySliderModule } from 'pretty-slider';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PrettySliderModule //<-- add the module in imports 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

* Add the component ```<pretty-slider>``` where slide part is expected in your application

---

## To brief the signatures of the components as below

1. ```[steps]``` - number of step ticks into slider bar. **steps** - hold the default value of step ticks (max: 10). | __type: *number*__
2. ```[value]``` - minimum and maximum initial value of selected interval. **value** - value in seconds from 00:00 to 23:59. If it is not set, the default value will be [0, 1200]. | __type: *array*__
3. ```[tooltips]``` - define if tooltips open aways or not. **tooltips** - open | close __type: *string*__
4. ```[interval]``` - sets minimum space (range) between tick handlers when moving the mouse. | __type: *number*__
5. ```(dragMoved)``` - This callback will be triggered when user drag and drop the slider items in the component.

# Sample implementation

**```app.module.ts```**

```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PrettySliderModule } from 'pretty-slider';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PrettySliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

**```app.component.html```**

```html
<div style="text-align:center;padding: 200px">
  <h1>
    Lets slide it!
  </h1>
  <pretty-slider [steps]="steps" [tooltips]="tooltips" [value]="rangeValue" [interval]="interval" (dragMoved)="onDragMoved($event)" class="blue"></pretty-slider>
</div>
```

**```app.component.ts```**

```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public steps: number = 10;
  public tooltips: string = 'close';
  public interval: number = 20;
  public rangeValue: number[] = [14320, 80400];
    
  onDragMoved(object: any) {
    console.log(object);
  }
}

> Thank you, give a try. Welcome!
