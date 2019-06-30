# PrettySlider

Simple and pretty highly customizable Angular slider.

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.0.

> This angular component library is planned to extends default angular slider and add mor slider handlers into the component.

For now, one component is added in this library
```html
<pretty-slider 
[steps]="10" 
class="blue" 
(dragMoved)="onDragMoved($event)"></pretty-slider>
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
2. ```(dragMoved)``` - This callback will be triggered when user drag and drop the slider items in the component.

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
  <pretty-slider [steps]="10" class="blue" (dragMoved)="onDragMoved($event)"></pretty-slider>
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

  onDragMoved(object: any) {
    console.log(object);
  }
}

> Thank you, give a try. Welcome!
