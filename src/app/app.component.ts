import { Component, OnInit } from '@angular/core';
import { NavLink } from './shared/model/nav-link.model';
import { WeathercastDataService } from './shared/services/weathercast-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  navLinks: NavLink[] = [];

  constructor(private dataService: WeathercastDataService){}

  ngOnInit(): void {
    this.navLinks = [
      new NavLink(0, '/weathercast-table', 'Weather Conditions Table'),
      new NavLink(1, '/weathercast-chart', 'Line Chart'),
      new NavLink(2, '/weathercast-calculator', 'Heat Index Calculator')
    ];

    this.dataService.fetchAllData(0);
  }
}
