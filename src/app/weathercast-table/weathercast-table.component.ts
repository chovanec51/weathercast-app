import { Component, OnInit } from '@angular/core';
import { WeathercastDataService } from '../shared/services/weathercast-data.service';

@Component({
  selector: 'app-weathercast-table',
  templateUrl: './weathercast-table.component.html',
  styleUrls: ['./weathercast-table.component.css']
})
export class WeathercastTableComponent implements OnInit {

  constructor(private dataService: WeathercastDataService){}

  ngOnInit(): void {
    this.dataService.fetchData();
  }
}
