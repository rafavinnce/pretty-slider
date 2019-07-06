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

  pos1 = 0;
  pos2 = 0;
  pos3 = 0;
  pos4 = 0;

  dayToTimestamp: number;
  timeStart: number;
  timeEnd: number;
  formatedTimeStart: string;
  formatedTimeEnd: string;
  compileSteps: any = [];

  @ViewChild('dragElementStart') dragElementStart: any;
  @ViewChild('dragElementEnd') dragElementEnd: any;

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

  dragMovedCall() {
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

  getInterval() {
    return this.interval && this.interval >= 20 ? this.interval : 20;
  }

  setDayToTimestamp() {
    this.dayToTimestamp = 86400;
  }

  getDayToTimestamp() {
    return this.dayToTimestamp;
  }

  getBindPercent(position) {
    return ( (100 * position) / this.getMainOffsetWidth() );
  }

  getStartLeft() {
    return this.dragElementStart.nativeElement.offsetLeft;
  }

  getBindTime(percent) {
    return ( (this.getDayToTimestamp() * percent) / 100 );
  }

  getMainOffsetLeft() {
    return this.dragMain.nativeElement.offsetLeft;
  }

  getMainOffsetWidth() {
    return this.dragMain.nativeElement.offsetWidth;
  }

  getEndLeft() {
    return this.dragElementEnd.nativeElement.offsetLeft;
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
    return this.timeEnd ? this.timeEnd : 20;
  }

  setFormatedTime(element, time, elementHTMLarget) {
    element = time;
    elementHTMLarget.nativeElement.querySelector('.e-tip-content').innerHTML = time;
  }

  getSteps() {
    return (this.steps);
  }

  handlerTooltips(element) {
    const items = element.nativeElement.querySelectorAll('.e-tooltip-wrap');
    (this.tooltips === 'open') ?
      items.forEach(function(userItem) { userItem.classList.add('show-tooltip') }) :
      items.forEach(function(userItem) { userItem.classList.remove('show-tooltip') });
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
      widthValue: (this.getMainOffsetWidth() / finalStepsCount),
      timeLabel: this.getFormatedTime(time)
    });
  }

  bindRange(value) {
    const obj = [];
    obj[0] = (typeof value !== 'undefined' && value[0] && typeof value[0] === 'number') ? value[0] : 0;
    obj[1] = (typeof value !== 'undefined' && value[1] && typeof value[1] === 'number') ? value[1] : (20 * 60);
    return obj;
  }

  handleRangeBar() {
    const rangeBar = this.eRange.nativeElement;
    rangeBar.setAttribute('style', 'left:'+this.getStartLeft()+'px');
    rangeBar.style.width = (this.getEndLeft() - this.getStartLeft()) + 'px';
  }

  setPositionInit(value, dragElement) {
    const percent = (100 * value) / this.getDayToTimestamp();
    const halfWidth = ( dragElement.nativeElement.offsetWidth / 2 );
    const rangePX = Math.floor((this.getMainOffsetWidth() * percent) / 100) - halfWidth;
    dragElement.nativeElement.setAttribute('style', 'left:'+rangePX+'px');
  }

  __init(value) {
    this.setTimeStart(this.bindRange(value)[0]);
    this.setTimeEnd(this.bindRange(value)[1]);

    this.setPositionInit(this.getTimeStart(), this.dragElementStart);
    this.setPositionInit(this.getTimeEnd(), this.dragElementEnd);

    this.handleRangeBar();

    this.handlerTooltips(this.dragElementStart);
    this.handlerTooltips(this.dragElementEnd);

    this.buildSteps();
    this.__setTime(this.getTimeStart(), this.getTimeEnd());
  }

  dragmousedown (e, element, item) {
    this.__activePointer(element);
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
    document.onmouseup = (e) => {
      this.closeDragElement(e, element);
    };
    // call a function whenever the cursor moves:
    document.onmousemove = (e) => {
      this.elementDrag(e, element, item);
    }
  }

  closeDragElement(e, element) {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    this._inactivePointer(element);
  }

  checkInterval(timeStart, timeEnd, interval, e, position, item) {
    let ret = true;
    const timeInterval = (interval * 60);
    const mouseLeft =  (e.clientX - this.dragMain.nativeElement.getBoundingClientRect().left) - ( this.dragElementStart.nativeElement.offsetWidth / 2 );
    const movementX = e.movementX ||
      e.mozMovementX ||
      e.webkitMovementX ||
      0;

    // determine the direction
    let direction = 0;
    if (movementX > 0) {
      direction = 1;
    } else if (movementX < 0) {
      direction = -1;
    }

    if ((timeEnd - timeStart) >= timeInterval) {
      ret = true;
    }
    else {
      if(item === 1) {
        if(direction == -1) {
          if ((mouseLeft - position) < 2) {
            ret = true;
          } else {
            ret = false;
          }
        } else if(direction == 1) {
          ret = false;
        } else if(direction == 0) {
          ret = false;
        }
      }
      else {
        if (direction == 1) {
          if((mouseLeft - position) > -2) {
            ret = true;
          } else {
            ret = false;
          }
        }
        else if(direction == 0) {
          ret = false;
        }
        else if(direction == -1) {
           ret = false;
        }
      }
    }

    return ret;
  }
  elementDrag(e, element, item) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    this.pos1 = this.pos3 - e.clientX;
    this.pos2 = this.pos4 - e.clientY;
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;

    const checkTargetBoundary = element.nativeElement.offsetLeft - this.pos1;
    const startMainBoundary = this.getMainOffsetLeft() - ( element.nativeElement.offsetWidth / 2 );
    const startMainWidthBoundary = this.getMainOffsetWidth() - ( element.nativeElement.offsetWidth / 2 );
    const endMainBoundary = this.dragMain.nativeElement.getBoundingClientRect().left;
    const endMainBoundaryCalc = (endMainBoundary + startMainWidthBoundary) + ( element.nativeElement.offsetWidth / 2 );

    let act = true;
    act = this.checkInterval(this.getTimeStart(), this.getTimeEnd(), this.getInterval(), e, (element.nativeElement.offsetLeft - this.pos1), item);

    // set the element's new position:
    (checkTargetBoundary >= startMainBoundary) ?
      // validation and workaround mouse positions
      (e.clientX >= element.nativeElement.getBoundingClientRect().left) ?
        (checkTargetBoundary <= startMainWidthBoundary) ?
          (e.clientX <= endMainBoundaryCalc) ?
            (act === true) ?
              this.__setElementLeft(element, (element.nativeElement.offsetLeft - this.pos1), item) :
              '' :
            '' :
          '' :
        '' :
      this.__unsetElementDrag(element);

    this.dragMovedCall();
  }

  __setTimeItem(element, position, item) {
    const percent = this.getBindPercent(position + ( element.nativeElement.offsetWidth / 2 ));
    const time = this.getBindTime(percent);

    (item === 1) ?
      this.__setTime(time, this.getTimeEnd()) :
      this.__setTime(this.getTimeStart(), time);
  }

  __setTime(start, end) {
    const range = [start, end];
    this.inputValue = [start, end];
    this.setTimeStart(this.bindRange(range)[0]);
    this.setTimeEnd(this.bindRange(range)[1]);

    this.setFormatedTime(this.formatedTimeStart, this.getFormatedTime(this.bindRange(range)[0]), this.dragElementStart);
    this.setFormatedTime(this.formatedTimeEnd, this.getFormatedTime(this.bindRange(range)[1]), this.dragElementEnd);
  }

  __setElementLeft(element, pos, item) {
    element.nativeElement.style.left = pos + "px";
    this.handleRangeBar();
    this.__setTimeItem(element, pos, item);
  }

  __unsetElementDrag(element) {
    element.nativeElement.dispatchEvent(new Event('mouseup'));
  }

  __activePointer(element) {
    element.nativeElement.classList.add('e-dragging');
  }

  _inactivePointer(element) {
    element.nativeElement.classList.remove('e-dragging');
  }

  ngOnInit() {
    this.__init(this.value);
    this.dragElementStart.nativeElement.onmousedown = (e) => {
      this.dragmousedown(e, this.dragElementStart, 1);
    };

    this.dragElementEnd.nativeElement.onmousedown = (e) => {
      this.dragmousedown(e, this.dragElementEnd, 2);
    };
  }
}
