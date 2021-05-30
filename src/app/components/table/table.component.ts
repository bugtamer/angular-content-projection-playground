import { Component, OnInit, Input } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { TableColumnComponent } from 'src/app/components/table-column/table-column.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {

  @Input() data: Array<Employee> = [];

  columnList: Array<TableColumnComponent> = [];

  constructor() { }

  ngOnInit(): void {
  }

  extract(model: Employee, path: string) {
    switch(path) {
      case 'id': return model.id;
      case 'name': return model.name;
      case 'surname': return model.surname;
      case 'age': return model.age;
      default: return 'N/A'
    }
  }

}
