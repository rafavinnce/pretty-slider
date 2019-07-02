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
  @Input() buttonLabel: string;

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
  defaultRange: any = [];

  tmpCheckTimeStart: number;
  tmpCheckTimeEnd: number;

  htmlStart: any;
  htmlEnd: any;
  htmlMain: any;

  @ViewChild('dragStart') dragStart: any;
  @ViewChild('dragEnd') dragEnd: any;
  @ViewChild('dragMain') dragMain: any;
  @ViewChild('eRange') eRange: any;
  @ViewChild('resetButton') resetButton: any;

  @Output() dragMoved: EventEmitter<any> = new EventEmitter<any>();
  @Output() inputValue: any;
  @Output() btnLabel: string;

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
      this.tmpCheckTimeStart = timeStart;
      this.setTimeStart(timeStart);
      this.setFormatedTime(this.formatedTimeStart, this.getFormatedTime(timeStart), this.dragStart);
      this.setRange([timeStart, this.getTimeEnd()], this.getInterval());
      this.inputValue = [timeStart, this.getTimeEnd()];
    }
    else {
      this.inputValue = [this.tmpCheckTimeStart, this.getTimeEnd()];
      this.setRange([this.tmpCheckTimeStart, this.getTimeEnd()], this.getInterval());
    }
  }

  bindEnd() {
    const position = ( this.getEndLeft() - this.getMainLeft());
    const percentEnd = this.getBindPercent(position);
    const timeEnd = this.getBindTime(percentEnd);

    if(this.checkInterval()) {
      this.tmpCheckTimeEnd = timeEnd;
      this.setTimeEnd(timeEnd);
      this.setFormatedTime(this.formatedTimeEnd, this.getFormatedTime(timeEnd), this.dragEnd);
      this.setRange([this.getTimeStart(), timeEnd], this.getInterval());
      this.inputValue = [this.getTimeStart(), timeEnd];
    }
    else {
      this.inputValue = [this.getTimeStart(), this.tmpCheckTimeEnd];
      this.setRange([this.getTimeStart(), this.tmpCheckTimeEnd], this.getInterval());
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
    this.compileSteps.length = 0;
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
    this.defaultRange = this.bindRange(value);
    this.rangeStart = this.bindRange(value)[0];
    this.rangeEnd = this.bindRange(value)[1];
    this.inputValue = [this.bindRange(value)[0], this.bindRange(value)[1]];
    this.tmpCheckTimeStart = this.bindRange(value)[0];
    this.tmpCheckTimeEnd = this.bindRange(value)[1];
  }

  bindRange(value) {
    const obj = [];
    obj[0] = (typeof value !== 'undefined' && value[0] && typeof value[0] === 'number') ? value[0] : 0;
    obj[1] = (typeof value !== 'undefined' && value[1] && typeof value[1] === 'number') ? value[1] : (20 * 60);
    return obj;
  }

  handleRangeBar(start, end) {

    const rangeBar = this.eRange.nativeElement;
    rangeBar.style.width = (end - start) + 'px';
    rangeBar.style.webkitTransform = 'translate3d('+start+'px,0px,0px)';
  }

  setRange(range, interval) {
    this.setTimeStart(this.bindRange(range)[0]);
    this.setTimeEnd(this.bindRange(range)[1]);

    const first = this.dragStart.nativeElement;
    const second = this.dragEnd.nativeElement;

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

  setPositionInit(value, dragElement) {
    const percent = (100 * value) / this.getDayToTimestamp();
    const rangePX = Math.floor((this.getMainWidth() * percent) / 100);
    dragElement.nativeElement.setAttribute('style', 'transform: translate3d('+rangePX+'px,0px,0px)');
    dragElement.nativeElement.setAttribute('style', '-webkit-transform: translate3d('+rangePX+'px,0px,0px)');
    dragElement.nativeElement.setAttribute('style', '-ms-transform: translate3d('+rangePX+'px,0px,0px)');
    dragElement.nativeElement.setAttribute('style', '-moz-transform: translate3d('+rangePX+'px,0px,0px)');
    dragElement.nativeElement.setAttribute('style', '-o-transform: translate3d('+rangePX+'px,0px,0px)');
  }

  setButtonLabel() {
    this.btnLabel = (this.buttonLabel !== '' && typeof this.buttonLabel !== 'undefined') ? this.buttonLabel : 'Reset';
    this.resetButton.nativeElement.innerHTML = this.btnLabel;
  }

  resetRange() {
    this.__init(this.defaultRange);
  }

  __init(value) {
    this.htmlStart = this.dragStart.nativeElement.innerHTML;
    this.htmlEnd = this.dragEnd.nativeElement.innerHTML;
    this.htmlMain = this.dragMain.nativeElement.innerHTML;

    this.setTimeStart(this.bindRange(value)[0]);
    this.setTimeEnd(this.bindRange(value)[1]);
    this.setPositionInit(this.bindRange(value)[0], this.dragStart);
    this.setPositionInit(this.bindRange(value)[1], this.dragEnd);
    this.inputRanges(value);
    this.bindStart();
    this.bindEnd();
    this.handlerRangeStart();
    this.handlerTooltips();
    this.buildSteps();
    this.setButtonLabel();
  }
  ngOnInit() {
    this.__init(this.value);

    this.resetButton.nativeElement.addEventListener('click', (e) => {
      this.resetRange();
    });
  }
}
