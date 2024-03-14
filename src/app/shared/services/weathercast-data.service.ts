import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { fetchWeatherApi } from 'openmeteo';
import { BehaviorSubject } from 'rxjs';
import { WeathercastDataRow } from 'src/app/shared/model/weathercast-data-row.model';
import { WeathercastData } from 'src/app/shared/model/weathercast-data.model';
import { WeathercastParams } from '../model/weathercast-params.model';

@Injectable({
  providedIn: 'root'
})
export class WeathercastDataService {

  private _defaultSort: Sort = {active: 'dateTime', direction: ''};
  private _rowsPerPage: number = 6;
  private _currentPage: number = 0;
  private _currentSort: Sort = this._defaultSort;
  weathercastData: WeathercastData = { rows: [], totalCount: 0 };
  weathercastDataSubject = new BehaviorSubject<WeathercastData>(this.weathercastData);
  

  private _params: WeathercastParams = {
    "latitude": 51.5085,
    "longitude": -0.1257,
    "hourly": ["temperature_2m", "relative_humidity_2m", "precipitation_probability", "precipitation", "weather_code", "surface_pressure", "wind_speed_10m"],
    "timezone": "Europe/London"
  };
  private _url = "https://api.open-meteo.com/v1/forecast";

  async fetchAllData(numOfPastDays: number): Promise<void> {
    var params = {...this._params};
    if (numOfPastDays > 0) {
      params.past_days = numOfPastDays;
    }
    const responses = await fetchWeatherApi(this._url, params);

    // Helper function to form time ranges
    const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();

    const hourly = response.hourly()!;

    const weatherData = {

      hourly: {
        time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
          (t) => new Date((t + utcOffsetSeconds) * 1000)
        ),
        temperature2m: hourly.variables(0)!.valuesArray()!,
        relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
        precipitationProbability: hourly.variables(2)!.valuesArray()!,
        precipitation: hourly.variables(3)!.valuesArray()!,
        weatherCode: hourly.variables(4)!.valuesArray()!,
        surfacePressure: hourly.variables(5)!.valuesArray()!,
        windSpeed10m: hourly.variables(7)!.valuesArray()!,
      },

    };

    const weatherDataRows: WeathercastDataRow[] = [];

    // `weatherData` now contains a simple structure with arrays for datetime and weather data
    for (let i = 0; i < weatherData.hourly.time.length; i++) {
      const tableRow = new WeathercastDataRow(
        weatherData.hourly.time[i],
        weatherData.hourly.weatherCode[i],
        weatherData.hourly.temperature2m[i],
        weatherData.hourly.surfacePressure[i],
        weatherData.hourly.relativeHumidity2m[i],
        weatherData.hourly.precipitationProbability[i]
      );
      weatherDataRows.push(tableRow);
    }

    this.weathercastData = {
      rows: weatherDataRows,
      totalCount: weatherDataRows.length
    }
    this.loadCurrentPage();
  }

  loadCurrentPage() {
    const from: number = this._currentPage * this._rowsPerPage;
    const to: number = from + this._rowsPerPage;
    const dataToDisplay: WeathercastData = {
      rows: this.weathercastData.rows.slice(from, to),
      totalCount: this.weathercastData.totalCount
    };

    if (this._currentSort && this._currentSort.direction) {
      const property: string = this._currentSort.active;
      switch (this._currentSort.direction) {
        case 'asc':
          dataToDisplay.rows.sort((a, b) => a.compare(b, property));
          break;
        case 'desc':
          dataToDisplay.rows.sort((a, b) => b.compare(a, property));
      }
      
    }

    this.weathercastDataSubject.next(dataToDisplay);
  }

  setPagination(pageNumber: number, rowsPerPage: number) {
    this._rowsPerPage = rowsPerPage;
    this._currentPage = pageNumber;
  }

  setSort(sortState?: Sort) {
    if (!sortState || !sortState.direction) {
      this._currentSort = this._defaultSort;
    }
    else {
      this._currentSort = sortState;
    }  
  }

  get currentPage(): number {
    return this._currentPage;
  } 

  get rowsPerPage(): number {
    return this._rowsPerPage;
  }
}
