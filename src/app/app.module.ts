import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
// import { PrettySliderModule } from 'pretty-slider';
import { PrettySliderModule } from '../../projects/pretty-slider/src/lib/pretty-slider.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PrettySliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
