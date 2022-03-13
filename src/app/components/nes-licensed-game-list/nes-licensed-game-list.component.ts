import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LicenseeService } from './../../services/nes/licensee/licensee.service';
import { GameService } from './../../services/nes/game/game.service';
import { Source } from './../../services/nes/models/source.model';
import { Release } from './../../services/nes/game/models/release.model';
import { Licensee } from './../../services/nes/licensee/models/licensee.model';
import { Game } from './../../services/nes/game/models/game.model';


@Component({
  selector: 'app-nes-licensed-game-list',
  templateUrl: './nes-licensed-game-list.component.html',
  styleUrls: ['./nes-licensed-game-list.component.sass']
})
export class NesLicensedGameListComponent implements OnInit {

  gameData     = new Source<Game>();
  licenseeData = new Source<Licensee>();

  filterBy: { [key: string] :FormControl } = {
    year:     new FormControl(null),
    month:    new FormControl(null, [Validators.min(1), Validators.max(12)]),
    licensee: new FormControl(null),
    game:     new FormControl(null),
  }

  rowsPerPage = new FormControl(11);

  month = { first:    1, last:   12 };
  year  = { first: 1984, last: 1995 };


  constructor(private gameService: GameService, private licenseeService: LicenseeService) { }


  async ngOnInit(): Promise<void> {
    this.gameData     = await this.fetchGames()    .toPromise() || [];
    this.licenseeData = await this.fetchLicensees().toPromise() || [];
    this.year.first = this.firstYear(this.gameData.data);
    this.year.last  = this.lastYear(this.gameData.data);
  }


  get licenseeList(): Array<Licensee> {
    return (this.licenseeData && this.licenseeData.data) ? this.licenseeData.data : [];
  }


  get gameList(): Array<Game> {
    return (this.gameData && this.gameData.data) ? this.gameData.data : [];
  }


  get filteredGameList(): Array<Game> {
    let data = this.gameList;
    data = this.filterByGame(data);
    data = this.filterByYear(data);
    data = this.filterByMonth(data);
    data = this.filterByLicensee(data);
    return data;
  }


  filterByRelease(release: Release): Array<Game> {
    return this.gameList.filter(
      game => (game.release.year === release.year) && (game.release.month === release.month)
    );
  }


  getLicenseeNameById(id: number): string {
    const target = this.licenseeList.find(licensee => licensee.id === id);
    return target ? target.licensee : 'Not Found';
  }


  private filterByYear(gameList: Array<Game>): Array<Game> {
    const year = this.filterBy.year.value as string;
    return year ? gameList.filter(game => game.release.year === +year) : gameList;
  }


  private filterByMonth(gameList: Array<Game>): Array<Game> {
    const month = this.filterBy.month.value as string;
    return month ? gameList.filter(game => game.release.month === +month) : gameList;
  }


  private filterByLicensee(gameList: Array<Game>): Array<Game> {
    const licenseeId = this.filterBy.licensee.value as string;
    return licenseeId ? gameList.filter(game => game.licensee === +licenseeId) : gameList;
  }


  private filterByGame(gameList: Array<Game>): Array<Game> {
    const gameName = this.filterBy.game.value as string;
    return gameName ? gameList.filter(game => this.matcher(game.title, gameName)) : gameList;
  }


  private matcher(title: string, searchString: string): boolean {
    if (title && searchString) {
      title = title.toLocaleUpperCase();
      let numMatches = 0;
      let keywordList = searchString.toUpperCase().split(' ').filter(w => w.length > 0 );
      for (const keyword of keywordList) {
        if (keyword) {
          const hasMatch = title.includes(keyword);
          if (hasMatch) {
            ++numMatches;
          }
        }
      }
      return numMatches === keywordList.length;
    }
    return false
  }


  private firstYear(gameList: Array<Game>): number {
    return Math.min(  ... this.years(gameList)  );
  }


  private lastYear(gameList: Array<Game>): number {
    return Math.max(  ... this.years(gameList)  );
  }


  private years(gameList: Array<Game>): Array<number> {
    return gameList.map(game => game.release.year);
  }


  private fetchGames(): Observable< Source<Game> > {
    return this.gameService.fecthGameList();
  }


  private fetchLicensees(): Observable< Source<Licensee> > {
    return this.licenseeService.fecthLicenseeList();
  }

}
