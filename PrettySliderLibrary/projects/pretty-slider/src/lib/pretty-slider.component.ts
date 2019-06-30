import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import * as moment from 'moment-timezone';

@Component({
  selector: 'pretty-slider',
  templateUrl: './pretty-slider.component.html',
  styleUrls: ['./pretty-slider.component.scss']
})
export class PrettySliderComponent implements OnInit {
  @Input() steps: number;

  interval: number;
  dayToTimestamp: number;
  timeStart: number;
  timeEnd: number;
  formatedTimeStart: string;
  formatedTimeEnd: string;
  compileSteps: any = [];

  @ViewChild('dragStart') dragStart: any;
  @ViewChild('dragEnd') dragEnd: any;
  @ViewChild('dragMain') dragMain: any;

  @Output() dragMoved: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.setWrapInterval(5);
    this.setDayToTimestamp();
  }

  triggerDragMoved(obj, item) {
    (item === 1) ? this.bindStart() : this.bindEnd();
    this.dragMoved.emit({
        timeStart: {
          time: this.getTimeStart(),
          formated: this.getFormatedTime(this.getTimeStart())
        },
        timeEnd: {
          time: this.getTimeEnd(),
          formated: this.getFormatedTime(this.getTimeEnd())
        }
      });
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

  getTimeStart() {
    return this.timeStart ? this.timeStart : 0;
  }

  setTimeEnd(time) {
    this.timeEnd = time;
  }

  getTimeEnd() {
    return this.timeEnd ? this.timeEnd : 0;
  }

  setFormatedTime(element, time, elementHTMLarget) {
    element = time;
    elementHTMLarget.nativeElement.querySelector('.e-tip-content').innerHTML = time;
  }

  buildSteps() {
    for (let i = 0; i < this.steps && this.steps <= 10 ? this.steps : 0; i++) {
      const percent = ( (100 * i) / this.steps );
      const time = this.getBindTime(percent);
      const finalStepsCount = (this.steps <= 10) ? this.steps : 10;

      this.compileSteps.push({
        percentValue: percent,
        timeValue: time,
        widthValue: (this.getMainWidth() / finalStepsCount) + 'px',
        timeLabel: this.getFormatedTime(time)
      });
    }
  }

  ngOnInit() {
    this.buildSteps();
  }
}
