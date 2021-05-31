import { Component } from '@angular/core';
import { STAFF } from './models/staff.stub';
import { Employee } from './models/employee.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  employeeList = STAFF;

  foo(employee: Employee): void {
    console.debug('foo()', employee);
  }

}
