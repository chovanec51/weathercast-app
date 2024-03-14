import { Component, OnInit } from '@angular/core';
import { HEAT_INDEX_HISTORY, MIN_CELSIUS_VALUE, MIN_FAHRENHEIT_VALUE, TEMPERATURE_UNIT_CELSIUS, TEMPERATURE_UNIT_FAHRENHEIT } from '../shared/constants';
import { AbstractControl, FormBuilder, FormGroup, MinValidator, Validators } from '@angular/forms';
import { InRangeValidator } from '../shared/validators/inRange.validator';

@Component({
  selector: 'app-weathercast-calculator',
  templateUrl: './weathercast-calculator.component.html',
  styleUrls: ['./weathercast-calculator.component.css']
})
export class WeathercastCalculatorComponent implements OnInit {
  form: FormGroup;
  temperatureFullValue: number = 0;
  minTemperature: number = MIN_CELSIUS_VALUE;
  minHumidity: number = 0;
  maxHumidity: number = 100;
  heatIndexValue: string = "";
  heatIndexHistory: string[] = [];

  constructor(private fb: FormBuilder){
    this.form = fb.group({
      'temperature': [null, 
        [Validators. required, Validators.min(this.minTemperature)]
      ],
      'unit': ['C', Validators.required],
      'humidity': [null, 
        [Validators.required, InRangeValidator(this.minHumidity, this.maxHumidity)]
      ]
    });
  }

  ngOnInit(): void {
      this.heatIndexHistory = this.getHeatIndexHistory();
  }

  getHeatIndexHistory(): string[] {
    if (!localStorage.getItem(HEAT_INDEX_HISTORY)) {
      return [];
    }

    const history: string = localStorage.getItem(HEAT_INDEX_HISTORY)!;
    return history.split(';');
  }

  convertDisplayedTemperature() {
    if (!this.temperature) {
      return;
    }
    this.heatIndexValue = "";
    var convertedValue;
    if (this.isCelsius()) {
      convertedValue = this.convertToFahrenheit();
      this.minTemperature = MIN_FAHRENHEIT_VALUE;
    }
    else {
      convertedValue = this.convertToCelsius();
      this.minTemperature = MIN_CELSIUS_VALUE;
    }
    this.temperature.setValidators([Validators.required, Validators.min(this.minTemperature)]);
    this.temperature.updateValueAndValidity();
    this.temperatureFullValue = convertedValue;
    this.temperature.setValue(this.temperatureFullValue.toFixed(1));
  }

  calculateHeatIndex()
  {
    if (!this.temperature || !this.humidity) {
      return;
    }

    this.heatIndexHistory = this.getHeatIndexHistory();
    
    const humidity: number = this.humidity.value;
    const tempF: number = this.isCelsius() ? this.convertToFahrenheit() : this.temperatureFullValue;
    if (isNaN(tempF)) { return; }

    var heatIndex = -42.379 + (2.04901523 * tempF) + (10.14333127 * humidity)
      - (0.22475541 * tempF * humidity) - (6.83783 * Math.pow(10, -3) * Math.pow(tempF, 2))
      - (5.481717 * Math.pow(10, -2) * Math.pow(humidity, 2)) + (1.22874 * Math.pow(10, -3) * Math.pow(tempF, 2) * humidity)
      + (8.5282 * Math.pow(10, -4) * tempF * Math.pow(humidity, 2)) - (1.99 * Math.pow(10, -6) * Math.pow(tempF, 2) * Math.pow(humidity, 2));
    
    heatIndex = this.isCelsius() ? this.convertToCelsius(heatIndex) : heatIndex;
    this.heatIndexValue = heatIndex.toFixed(1);
    this.saveToHistory(this.heatIndexValue+'°'+this.unit.value);
  }

  private saveToHistory(value: string){
    if (!localStorage.getItem(HEAT_INDEX_HISTORY)) {
      localStorage.setItem(HEAT_INDEX_HISTORY, value);
      return;
    }

    const history: string = localStorage.getItem(HEAT_INDEX_HISTORY)!;
    const historyArray: string[] = history.split(";");
    historyArray.push(value);
    if (historyArray.length > 5) {
      historyArray.splice(0, 1);
    }

    localStorage.setItem(HEAT_INDEX_HISTORY, historyArray.join(';'));
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
