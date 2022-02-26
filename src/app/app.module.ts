import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { SuffixDirective } from './directives/suffix/suffix.directive';
import { DigitalRootPipe } from './pipes/digital-root.pipe';
import { UuidService } from './services/uuid/uuid.service';
import { LicenseeService } from './services/nes/licensee/licensee.service';
import { GameService } from './services/nes/game/game.service';
import { InputComponent } from './components/forms/input/input.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    SuffixDirective,
    DigitalRootPipe,
    InputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    UuidService,
    GameService,
    LicenseeService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
