import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeathercastChartComponent } from './weathercast-chart.component';

describe('WeathercastChartComponent', () => {
  let component: WeathercastChartComponent;
  let fixture: ComponentFixture<WeathercastChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeathercastChartComponent]
    });
    fixture = TestBed.createComponent(WeathercastChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
