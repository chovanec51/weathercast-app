import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { WeathercastDataService } from '../shared/services/weathercast-data.service';
import { WeathercastDataRow } from '../model/weathercast-data-row.model';
import { ChartData } from '../model/chart-data.model';
import { ChartOptions } from '../model/chart-options.model';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
import { WeathercastData } from '../model/weathercast-data.model';
import { LOCALE, TIME_FORMAT } from '../shared/constants';

@Component({
  selector: 'app-weathercast-chart',
  templateUrl: './weathercast-chart.component.html',
  styleUrls: ['./weathercast-chart.component.css']
})
export class WeathercastChartComponent implements OnInit {
  chartData: ChartData = new ChartData([], []);
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> | null = null;

  constructor(private dataService: WeathercastDataService){}

  ngOnInit(): void {
      this.dataService.weathercastDataSubject.subscribe({
        next: (responseData: WeathercastData) => {
          this.updateChartData(responseData.rows);
          this.setChartOptions();
        }
      });
  }

  private updateChartData(rows: WeathercastDataRow[]) {
    const data: string[] = [];
    const categories: string[] = [];

    for (let row of rows) {
      data.push(row.temperature.toFixed(1));
      categories.push(this.formatDateTime(row.dateTime));
    }

    this.chartData.data = data;
    this.chartData.categories = categories;
  }
  
  private formatDateTime(date: Date): string {
    return date.toLocaleString(LOCALE, TIME_FORMAT);
  } 

  private setChartOptions() {
    if (!this.chartData) {
      return;
    }

    this.chartOptions = {
      series: [
        {
          name: "Temperature",
          data: this.chartData.data
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return val + "°C";
        },
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Hourly temperature chart",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: this.chartData.categories
      }
    };
  }
}
