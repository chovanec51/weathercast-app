import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeathercastTableComponent } from './weathercast-table/weathercast-table.component';
import { WeathercastChartComponent } from './weathercast-chart/weathercast-chart.component';
import { WeathercastCalculatorComponent } from './weathercast-calculator/weathercast-calculator.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'weathercast-table',
    pathMatch: 'full'
  },
  {
    path: 'weathercast-table',
    component: WeathercastTableComponent
  },
  {
    path: 'weathercast-chart',
    component: WeathercastChartComponent
  },
  {
    path: 'weathercast-calculator',
    component: WeathercastCalculatorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
