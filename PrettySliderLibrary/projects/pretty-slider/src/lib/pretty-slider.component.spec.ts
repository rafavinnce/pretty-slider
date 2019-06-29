import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrettySliderComponent } from './pretty-slider.component';

describe('PrettySliderComponent', () => {
  let component: PrettySliderComponent;
  let fixture: ComponentFixture<PrettySliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrettySliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrettySliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
