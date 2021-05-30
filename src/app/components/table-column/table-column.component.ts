import { Component, OnInit, Input } from '@angular/core';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-table-column',
  templateUrl: './table-column.component.html',
  styleUrls: ['./table-column.component.sass']
})
export class TableColumnComponent implements OnInit {

  @Input() path: string = '';

  constructor(private table: TableComponent) {
    this.table.columnList.push(this);
  }

  ngOnInit(): void {
  }

}
