import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeathercastCalculatorComponent } from './weathercast-calculator.component';

describe('WeathercastCalculatorComponent', () => {
  let component: WeathercastCalculatorComponent;
  let fixture: ComponentFixture<WeathercastCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeathercastCalculatorComponent]
    });
    fixture = TestBed.createComponent(WeathercastCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
