import { Component, OnInit,Input,Output,EventEmitter,OnChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { IPaginationConfig, ITableColumn } from '../../interfaces/table.interface';

@Component({
  selector: 'app-generic-data-table',
  templateUrl: './generic-data-table.component.html',
  styleUrls: ['./generic-data-table.component.scss']
})
export class GenericDataTableComponent implements OnInit ,OnChanges{

  @Input() displayedColumns!: ITableColumn[];
  @Input() dataSource!: any[];
  @Input() paginationConfig!: IPaginationConfig;
  @Input() loading!: boolean;
  @Output() fetchData: EventEmitter<any> = new EventEmitter();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  columns!: string[];
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any) {
    console.log("changes",changes)
    if (changes && changes.dataSource && changes.displayedColumns) {
      this.setColumns();
      this.setPageIndex();
    }
  }

  setPageIndex() {
    if (this.paginationConfig && this.paginationConfig.pageIndex === 0) {
      this.paginator.firstPage();
    }
  }

  onRequestToFetchData(pageEventData : PageEvent) {
    this.fetchData.emit(pageEventData);
  }

  onPage(event : PageEvent) {
    this.onRequestToFetchData(event);
  }

  setColumns() {
    this.columns = this.displayedColumns.map((column) => column.name);
  }
  
  

}
