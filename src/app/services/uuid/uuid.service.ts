import { Injectable } from '@angular/core';
// const { v4: uuidv4 } = require('uuid');
import { v4 as uuidv4 } from 'uuid';

/**
 * @see https://www.npmjs.com/package/uuid
 */
@Injectable({
  providedIn: 'root'
})
export class UuidService {

  constructor() { }

  v4(): string {
    return uuidv4();
  }

}
