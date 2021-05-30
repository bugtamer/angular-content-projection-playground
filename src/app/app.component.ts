import { Component } from '@angular/core';
import { STAFF } from './models/staff.stub';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  employeeList = STAFF;
}
