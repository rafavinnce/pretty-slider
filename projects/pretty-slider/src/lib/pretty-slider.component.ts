import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import * as moment from 'moment-timezone';

@Component({
  selector: 'pretty-slider',
  templateUrl: './pretty-slider.component.html',
  styleUrls: ['./pretty-slider.component.scss']
})
export class PrettySliderComponent implements OnInit {
  @Input() steps: number;
  @Input() tooltips: string;
  @Input() value: any;
  @Input() interval: number;

  dayToTimestamp: number;
  timeStart: number;
  timeEnd: number;
  formatedTimeStart: string;
  formatedTimeEnd: string;
  compileSteps: any = [];

  rangeStart: number;
  rangeEnd: number;
  rangeFirstPX: number;
  rangeEndPX: number;

  @ViewChild('dragStart') dragStart: any;
  @ViewChild('dragEnd') dragEnd: any;
  @ViewChild('dragMain') dragMain: any;

  @Output() dragMoved: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
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

    if(this.checkInterval()) {
      this.setTimeStart(timeStart);
      this.setFormatedTime(this.formatedTimeStart, this.getFormatedTime(timeStart), this.dragStart);
    }
    this.setRange([timeStart, this.getTimeEnd()], this.getInterval());
  }

  bindEnd() {
    const position = ( this.getEndLeft() - this.getMainLeft());
    const percentEnd = this.getBindPercent(position);
    const timeEnd = this.getBindTime(percentEnd);
    if(this.checkInterval()) {
      this.setTimeEnd(timeEnd);
      this.setFormatedTime(this.formatedTimeEnd, this.getFormatedTime(timeEnd), this.dragEnd);
      this.setRange([this.getTimeStart(), timeEnd], this.getInterval());
    }
  }

  setDayToTimestamp() {
    this.dayToTimestamp = 86340;
  }

  getDayToTimestamp() {
    return this.dayToTimestamp;
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

  getSteps() {
    return (this.steps);
  }

  handlerTooltips() {
    const itens = document.querySelectorAll('.e-tooltip-wrap');
    (this.tooltips === 'open') ?
      itens.forEach(function(userItem) { userItem.classList.add('show-tooltip') }) :
      itens.forEach(function(userItem) { userItem.classList.remove('show-tooltip') });
  }

  buildSteps() {
    for (let i = 0; i < this.getSteps() && this.getSteps() <= 10 ? this.getSteps() : 0; i++) {
      const percent = ( (100 * i) / this.getSteps() );
      this.handlerResults(i, percent);
    }
    this.handlerResults(this.getSteps()+1, 100);
  }

  handlerResults(index, percent) {
    const time = this.getBindTime(percent);
    const finalStepsCount = (this.getSteps() <= 10) ? this.getSteps() : 10;

    this.compileSteps.push({
      percentValue: percent,
      timeValue: time,
      widthValue: (this.getMainWidth() / finalStepsCount),
      timeLabel: this.getFormatedTime(time)
    });
  }

  handlerRangeStart() {
    (typeof this.value === 'object' && typeof this.value !== 'undefined') ?
      this.setAllStart() :
      '';
  }

  setAllStart() {
    this.setRange(this.value, this.interval);
  }

  getRangeStart() {
    return this.rangeStart ? this.rangeStart : 0;
  }

  getRangeEnd() {
    return this.rangeEnd ? this.rangeEnd : (20 * 60);
  }

  inputRanges(value) {
    this.rangeStart = this.bindRange(value)[0];
    this.rangeEnd = this.bindRange(value)[1];
  }

  bindRange(value) {
    const obj = [];
    obj[0] = (value[0] && typeof value[0] === 'number') ? value[0] : 0;
    obj[1] = (value[1] && typeof value[1] === 'number') ? value[1] : (20 * 60);
    return obj;
  }

  handleRangeBar(start, end) {
    const rangeBar = (document.querySelector('.e-range') as HTMLElement);
    rangeBar.style.width = (end - start) + 'px';
    rangeBar.style.webkitTransform = 'translate3d('+start+'px,0px,0px)';
  }

  setRange(range, interval) {
    this.setTimeStart(this.bindRange(range)[0]);
    this.setTimeEnd(this.bindRange(range)[1]);

    const first = (document.querySelector('.e-handle-first') as HTMLElement);
    const second = (document.querySelector('.e-handle-second') as HTMLElement);

    this.setFormatedTime(this.formatedTimeStart, this.getFormatedTime(this.bindRange(range)[0]), this.dragStart);
    this.setFormatedTime(this.formatedTimeEnd, this.getFormatedTime(this.bindRange(range)[1]), this.dragEnd);

    const firstRaggePercent = (100 * this.bindRange(range)[0]) / this.getDayToTimestamp();
    const secondRaggePercent = (100 * this.bindRange(range)[1]) / this.getDayToTimestamp();

    const rangeFirstPX = Math.floor((this.getMainWidth() * firstRaggePercent) / 100);
    const rangeSecondPX = Math.floor((this.getMainWidth() * secondRaggePercent) / 100);
    this.rangeFirstPX = rangeFirstPX;
    this.rangeEndPX = rangeSecondPX;

    this.rangeStart = this.bindRange(range)[0];
    this.rangeEnd = this.bindRange(range)[1];

    first.style.webkitTransform = 'translate3d('+rangeFirstPX+'px,0px,0px)';
    second.style.webkitTransform = 'translate3d('+rangeSecondPX+'px,0px,0px)';
    second.style.left = '0px';

    this.handleRangeBar(this.rangeFirstPX, this.rangeEndPX);
  }

  getInterval() {
    const interval = this.interval ? this.interval : 20;
    return (interval * 60);
  }

  checkInterval() {
    return ( (this.getRangeEnd() - this.getRangeStart()) >= this.getInterval() );
  }

  ngOnInit() {
    this.inputRanges(this.value);
    this.bindStart();
    this.bindEnd();
    this.buildSteps();
    this.handlerTooltips();
    this.handlerRangeStart();
  }
}
