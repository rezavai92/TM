import { Component, OnInit,Input,Output,EventEmitter,OnChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
  @Output() fetchData: EventEmitter<any> = new EventEmitter();

  columns!: string[];
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes : any) {
    if (changes) {
      this.setColumns();
    }
  }

  onRequestToFetchData(pageEventData : PageEvent) {
    const pageIndex = pageEventData.pageIndex;
    this.fetchData.emit(pageIndex);
  }

  onPage(event : PageEvent) {
    this.onRequestToFetchData(event);
  }

  setColumns() {
    this.columns = this.displayedColumns.map((column) => column.name);
  }
  
  

}
