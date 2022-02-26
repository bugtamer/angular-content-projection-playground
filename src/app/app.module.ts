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

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    SuffixDirective,
    DigitalRootPipe
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
