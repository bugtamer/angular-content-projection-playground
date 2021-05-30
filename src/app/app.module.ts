import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { TableColumnComponent } from './components/table-column/table-column.component';
import { TableDatumComponent } from './components/table-datum/table-datum.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    TableColumnComponent,
    TableDatumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
