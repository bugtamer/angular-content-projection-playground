import { TestBed } from '@angular/core/testing';

import { InputGuardService } from './input-guard.service';

describe('InputGuardService', () => {
  let service: InputGuardService;
  const name = 'input-variable-name';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('string(name: string, value: string)', () => {
    it('should do nothing when value is provided', () => {
      const value = 'non empty value';
      expect(
        function () { service.string(name, value) }
      );
    });

    it('should throw an error when value is undefined', () => {
      expect(
        function (value: string) { service.string(name, value) }
      ).toThrowError();
      
    });
 
    it('should throw an error when value is empty string', () => {
      const value = '';
      expect(
        function () { service.string(name, value) }
      ).toThrowError();
    });
  });

  describe('minNumber(name: string, value: number, min: number)', () => {
    it('should do nothing when value > min', () => {
      const value = 11;
      const min = 10;
      expect( service.minNumber(name, value, min) );
    });

    it('should do nothing when value = min', () => {
      const value = 10;
      const min = 10;
      expect( service.minNumber(name, value, min) );
    });

    it('should throw an error when value < min', () => {
      const value = 9;
      const min = 10;
      expect( function () { service.minNumber(name, value, min) } ).toThrowError();
    });
  });

  describe('expectedNumber(name: string, value: number, expected: number)', () => {
    it('should do nothing when value is equal to expected', () => {
      const value = 10;
      const expected = 10;
        expect( service.expectedNumber(name, value, expected) );
    });

    it('should do nothing when value is less than expected', () => {
      const value = 9;
      const expected = 10;
      expect( function () { service.expectedNumber(name, value, expected) } ).toThrowError();
    });

    it('should do nothing when value is greater than expected', () => {
      const value = 11;
      const expected = 10;
      expect( function () { service.expectedNumber(name, value, expected) } ).toThrowError();
    });
  });

  describe('maxNumber(name: string, value: number, max: number)', () => {
    it('should do nothing when value < max', () => {
      const value = 9;
      const max = 10;
      expect( service.maxNumber(name, value, max) );
    });

    it('should do nothing when value = max', () => {
      const value = 10;
      const max = 10;
      expect( service.maxNumber(name, value, max) );
    });

    it('should throw an error when value > max', () => {
      const value = 11;
      const max = 10;
      expect( function () { service.maxNumber(name, value, max) } ).toThrowError();
    });
  });

});
