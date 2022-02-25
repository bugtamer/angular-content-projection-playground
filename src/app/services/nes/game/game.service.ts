import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Source } from './../models/source.model';
import { Game } from './models/game.model';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  fecthGameList(): Observable< Source<Game> > {
    const url = 'assets/data/nes/nes-licensed-games.json';
    return this.http.get< Source<Game> >(url);
  }

}
