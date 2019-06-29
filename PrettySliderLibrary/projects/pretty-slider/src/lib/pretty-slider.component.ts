import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import * as moment from 'moment-timezone';

@Component({
  selector: 'pretty-slider',
  templateUrl: './pretty-slider.component.html',
  styleUrls: ['./pretty-slider.component.scss']
})
export class PrettySliderComponent implements OnInit {

  interval: number;
  dayToTimestamp: number;
  timeStart: number;
  timeEnd: number;
  formatedTimeStart: string;
  formatedTimeEnd: string;

  @ViewChild('dragStart') dragStart: any;
  @ViewChild('dragEnd') dragEnd: any;
  @ViewChild('dragMain') dragMain: any;

  constructor() {
    this.setWrapInterval(5);
    this.setDayToTimestamp();
  }
  @Input() steps: number;

  allMouseUp() {}

  allMouseLeave() {}

  dragMoved(obj, item) {
    (item === 1) ? this.bindStart() : this.bindEnd();
  }

  onMouseDown(event) {
  }

  bindStart() {
    const position = ( this.getTargetLeft() - this.getMainLeft());
    const percentStart = this.getBindPercent(position);
    const timeStart = this.getBindTime(percentStart);
    this.setTimeStart(timeStart);
    this.setFormatedTime(this.formatedTimeStart, this.getFormatedTime(timeStart), this.dragStart);
  }

  bindEnd() {
    const position = ( this.getEndLeft() - this.getMainLeft());
    const percentEnd = this.getBindPercent(position);
    const timeEnd = this.getBindTime(percentEnd);
    this.setTimeEnd(timeEnd);
    this.setFormatedTime(this.formatedTimeEnd, this.getFormatedTime(timeEnd), this.dragEnd);
  }

  setDayToTimestamp() {
    this.dayToTimestamp = 86340;
  }

  getDayToTimestamp() {
    return this.dayToTimestamp;
  }

  setWrapInterval(interval) {
    this.interval = interval;
  }

  getBindPercent(position) {
    return ( (100 * position) / this.getMainWidth() );
  }
  getTargetLeft() {
    return this.dragStart.nativeElement.getClientRects()[0].left;
  }

  getBindTime(percent) {
    return ( (this.getDayToTimestamp() * percent) / 100 );
  }
  getMainLeft() {
    return this.dragMain.nativeElement.getClientRects()[0].left;
  }

  getEndLeft() {
    return this.dragEnd.nativeElement.getClientRects()[0].left;
  }

  getMainWidth() {
    return (this.dragMain.nativeElement.clientWidth - this.getTargetWidth());
  }

  getTargetWidth() {
    return this.dragStart.nativeElement.clientWidth;
  }

  getFormatedTime(seconds) {
    return moment.utc(seconds * 1000).format('HH:mm A');
  }

  setTimeStart(time) {
    this.timeStart = time;
  }

  setTimeEnd(time) {
    this.timeEnd = time;
  }

  setFormatedTime(element, time, elementHTMLarget) {
    element = time;
    elementHTMLarget.nativeElement.querySelector('.e-tip-content').innerHTML = time;
  }

  getFormatedTimeStart() {
    return this.formatedTimeStart;
  }

  getFormatedTimeEnd() {
    return this.formatedTimeEnd;
  }

  ngOnInit() {}
}
