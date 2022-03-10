import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { SuffixDirective } from './directives/suffix/suffix.directive';
import { DigitalRootPipe } from './pipes/digital-root.pipe';
import { UuidService } from './services/uuid/uuid.service';
import { LicenseeService } from './services/nes/licensee/licensee.service';
import { GameService } from './services/nes/game/game.service';
import { NesLicensedGameListComponent } from './components/nes-licensed-game-list/nes-licensed-game-list.component';
import { InputComponent } from './components/forms/input/input.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    SuffixDirective,
    DigitalRootPipe,
    NesLicensedGameListComponent,
    InputComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    UuidService,
    GameService,
    LicenseeService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
