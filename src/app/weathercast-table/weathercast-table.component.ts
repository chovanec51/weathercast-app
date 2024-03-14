import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { WeathercastDataService } from '../shared/services/weathercast-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { WeathercastDataRow } from '../shared/model/weathercast-data-row.model';
import { WeathercastData } from '../shared/model/weathercast-data.model';
import { MatSort, Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-weathercast-table',
  templateUrl: './weathercast-table.component.html',
  styleUrls: ['./weathercast-table.component.css']
})
export class WeathercastTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = WeathercastDataRow.getProperties();
  dataSource = new MatTableDataSource<WeathercastDataRow>();
  totalRows: number = 0;
  rowsPerPage: number;
  currentPage: number;
  pastDaysCount: string = "1";
  pageSizeOptions: number[] = [6, 12, 24, 48];
  showHistoricalData: boolean = false;
  hasShownHistoricalData: boolean = false;
  private weathercastDataSub!: Subscription;

  @ViewChild('MatPaginator') paginator!: MatPaginator;
  @ViewChild('MatSort') sort!: MatSort;

  constructor(private dataService: WeathercastDataService){
    this.rowsPerPage = dataService.rowsPerPage;
    this.currentPage = dataService.currentPage;
  }

  ngOnInit(): void {
    this.weathercastDataSub = this.dataService.weathercastDataSubject.subscribe({
      next: (responseData: WeathercastData) => {
        this.dataSource.data = responseData.rows;
        this.totalRows = responseData.totalCount;
      }
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.dataService.setPagination(pageData.pageIndex, pageData.pageSize);
    this.dataService.loadCurrentPage();
  }

  onSortChange(sortState: Sort) {
    this.dataService.setSort(sortState);
    this.dataService.loadCurrentPage();
  }

  onShowHistoricalData(event: MatCheckboxChange) {
    this.showHistoricalData = event.checked;
  }

  onAddHistoricalData(addNone?: boolean) {
    this.hasShownHistoricalData = !addNone;
    if (addNone) {
      this.dataService.fetchAllData(0);
      return;
    }
    this.dataService.fetchAllData(+this.pastDaysCount);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.weathercastDataSub.unsubscribe();
}
}
