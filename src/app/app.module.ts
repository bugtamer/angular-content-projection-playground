import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { InjectorDirective } from './directives/injector/injector.directive';
import { SuffixDirective } from './directives/suffix/suffix.directive';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    InjectorDirective,
    SuffixDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
