import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeathercastTableComponent } from './weathercast-table.component';

describe('WeathercastTableComponent', () => {
  let component: WeathercastTableComponent;
  let fixture: ComponentFixture<WeathercastTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeathercastTableComponent]
    });
    fixture = TestBed.createComponent(WeathercastTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
