import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputGuardService {

  constructor() { }

  string(name: string, value: string): void {
    if (!value) {
      throw new Error(`The required input '${name}' was not provided. Actual value: '${value}'.`);
    }
  }

  minNumber(name: string, value: number, min: number): void {
    if (value < min) {
      throw new Error(`The input '${name}' (${value}) is lower than minimum required value: ${min}.`);
    }
  }

  expectedNumber(name: string, value: number, expected: number): void {
    if (value !== expected) {
      throw new Error(`The input '${name}' (${value}) is different than the expected value: ${expected}.`);
    }
  }

  maxNumber(name: string, value: number, max: number): void {
    if (value > max) {
      throw new Error(`The input '${name}' (${value}) is greater than maximum required value: ${max}.`);
    }
  }

}
