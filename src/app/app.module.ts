import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MaterialsModule } from './materials.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WeathercastTableComponent } from './weathercast-table/weathercast-table.component';
import { WeathercastChartComponent } from './weathercast-chart/weathercast-chart.component';
import { WeathercastCalculatorComponent } from './weathercast-calculator/weathercast-calculator.component';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    AppComponent,
    WeathercastTableComponent,
    WeathercastChartComponent,
    WeathercastCalculatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
    ReactiveFormsModule,
    NgApexchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
