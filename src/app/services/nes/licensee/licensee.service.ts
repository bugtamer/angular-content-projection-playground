import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Source } from './../models/source.model';
import { Licensee } from './models/licensee.model';


@Injectable({
  providedIn: 'root'
})
export class LicenseeService {

  constructor(private http: HttpClient) { }

  fecthLicenseeList(): Observable< Source<Licensee> > {
    const url = 'assets/data/nes/nes-licensees.json';
    return this.http.get< Source<Licensee> >(url);
  }

}
