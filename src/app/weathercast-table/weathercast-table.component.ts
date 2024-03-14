import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { WeathercastDataService } from '../shared/services/weathercast-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { WeathercastDataRow } from '../model/weathercast-data-row.model';
import { WeathercastData } from '../model/weathercast-data.model';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-weathercast-table',
  templateUrl: './weathercast-table.component.html',
  styleUrls: ['./weathercast-table.component.css']
})
export class WeathercastTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = WeathercastDataRow.getProperties();
  dataSource = new MatTableDataSource<WeathercastDataRow>();
  totalRows = 0;
  rowsPerPage;
  currentPage;
  pageSizeOptions = [6, 12, 24, 48];

  @ViewChild('MatPaginator') paginator!: MatPaginator;
  @ViewChild('MatSort') sort!: MatSort;

  constructor(private dataService: WeathercastDataService){
    this.rowsPerPage = dataService.rowsPerPage;
    this.currentPage = dataService.currentPage;
  }

  ngOnInit(): void {
    this.dataService.weathercastDataSubject.subscribe({
      next: (responseData: WeathercastData) => {
        this.dataSource.data = responseData.rows;
        this.totalRows = responseData.totalCount;
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onChangedPage(pageData: PageEvent) {
    this.dataService.setPagination(pageData.pageIndex, pageData.pageSize);
    this.dataService.loadCurrentPage();
  }

  onSortChange(sortState: Sort) {
    this.dataService.setSort(sortState);
    this.dataService.loadCurrentPage();
  }
}
