import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { PrettySliderComponent } from './pretty-slider.component';

@NgModule({
  declarations: [PrettySliderComponent],
  imports: [
    BrowserModule,
    CommonModule,
    DragDropModule,
  ],
  exports: [PrettySliderComponent, DragDropModule]
})
export class PrettySliderModule { }
