import { Component } from '@angular/core';
import { TEMPERATURE_UNIT_CELSIUS, TEMPERATURE_UNIT_FAHRENHEIT } from '../shared/constants';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InRangeValidator } from '../shared/validators/inRange.validator';

@Component({
  selector: 'app-weathercast-calculator',
  templateUrl: './weathercast-calculator.component.html',
  styleUrls: ['./weathercast-calculator.component.css']
})
export class WeathercastCalculatorComponent {
  form: FormGroup;
  temperatureFullValue: number = 0;
  minTemperature: number = 27.7;
  maxTemperature: number = 80;
  minHumidity: number = 0;
  maxHumidity: number = 100;

  constructor(private fb: FormBuilder){
    this.form = fb.group({
      'temperature': [null, 
        [Validators. required, InRangeValidator(this.minTemperature, this.maxTemperature)]
      ],
      'unit': ['C', Validators.required],
      'humidity': [null, 
        [Validators.required, InRangeValidator(this.minHumidity, this.maxHumidity)]
      ],
      'heatIndex': []
    });
  }

  convertDisplayedTemperature() {
    if (!this.temperature) {
      return;
    }

    var convertedValue;
    if (this.isCelsius()) {
      convertedValue = this.convertToCelsius();
      this.minTemperature = this.convertToCelsius(this.minTemperature);
      this.maxTemperature = this.convertToCelsius(this.maxTemperature);
    }
    else {
      convertedValue = this.convertToFahrenheit();
      this.minTemperature = this.convertToFahrenheit(this.minTemperature);
      this.maxTemperature = this.convertToFahrenheit(this.maxTemperature);
    }
    this.temperature.setValidators([Validators.required, InRangeValidator(this.minTemperature, this.maxTemperature)]);
    this.temperature.updateValueAndValidity();
    this.temperatureFullValue = convertedValue;
    this.temperature.setValue(this.temperatureFullValue.toFixed(1));
  }

  calculateHeatIndex()
  {
    this.form.controls['heatIndex'].setValue(null);
    if (!this.temperature || !this.humidity) {
      
      return;
    }

    const humidity: number = this.humidity.value;
    const tempF: number = this.isCelsius() ? this.convertToFahrenheit() : this.temperatureFullValue;
    if (isNaN(tempF)) { return; }

    var heatIndex = -42.379 + (2.04901523 * tempF) + (10.14333127 * humidity)
      - (0.22475541 * tempF * humidity) - (6.83783 * Math.pow(10, -3) * Math.pow(tempF, 2))
      - (5.481717 * Math.pow(10, -2) * Math.pow(humidity, 2)) + (1.22874 * Math.pow(10, -3) * Math.pow(tempF, 2) * humidity)
      + (8.5282 * Math.pow(10, -4) * tempF * Math.pow(humidity, 2)) - (1.99 * Math.pow(10, -6) * Math.pow(tempF, 2) * Math.pow(humidity, 2));
    
    heatIndex = this.isCelsius() ? this.convertToCelsius(heatIndex) : heatIndex;
    this.form.controls['heatIndex'].setValue(heatIndex.toFixed(1));
  }

  private isCelsius() {
    return this.unit.value === TEMPERATURE_UNIT_CELSIUS;
  }

  private convertToCelsius(value?: number): number {
    if (value) {
      return (value - 32) * 5 / 9;
    }
    return (this.temperatureFullValue - 32) * 5 / 9;
  }

  private convertToFahrenheit(value?: number): number {
    if (value) {
      return (value * 9 / 5) + 32;
    }
    return (this.temperatureFullValue * 9 / 5) + 32;
  }

  get temperature(): AbstractControl {
    return this.form.controls['temperature'];
  }

  get unit(): AbstractControl {
    return this.form.controls['unit'];
  }

  get humidity(): AbstractControl {
    return this.form.controls['humidity'];
  }
}
