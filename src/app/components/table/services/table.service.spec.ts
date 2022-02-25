import { TestBed } from '@angular/core/testing';

import { TableService } from './table.service';
import { InputGuardService } from 'src/app/services/input-guard/input-guard.service';

describe('TableService', () => {

  let service!: TableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InputGuardService]
    });
    service = TestBed.inject(TableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('assertCaptionExist()', () => {
    it('should do nothing when caption is present and not empty', () => {
      const caption = document.createElement('p');
      caption.innerText = 'Title';
      expect( () => { service.assertCaptionExist(caption) } ).not.toThrowError();
    });

    it('should throw an error when caption is not present', () => {
      const caption = document.createElement('p');
      expect( () => { service.assertCaptionExist(caption) } ).toThrowError(/caption/ig);
    });

    it('should throw an error when caption is empty', () => {
      const caption = document.createElement('p');
      caption.innerText = '';
      expect( () => { service.assertCaptionExist(caption) } ).toThrowError(/caption/ig);
    });
  });

  describe('assertHeaderExist()', () => {
    it('should do nothing when header has at least one column', () => {
      const header = tr();
      header.appendChild( th() );
      expect( () => { service.assertHeaderExist(header) } ).not.toThrowError();
    });

    it('should throw an error when header has no columns', () => {
      let header!: HTMLElement;
      expect( () => { service.assertHeaderExist(header) } ).toThrowError(/header/ig);
    });
  });

  describe('assertBodyMatchesHeaderColumns()', () => {
    it('should do nothing when body and header have the same number of columns', () => {
      const bodyRow = tr();
      bodyRow.appendChild( td() );
      bodyRow.appendChild( td() );
      const body = tbody().appendChild(bodyRow);

      const headerRow = tr();
      headerRow.appendChild( th() );
      headerRow.appendChild( th() );
      const header = tbody().appendChild(headerRow);
      expect( () => { service.assertBodyMatchesHeaderColumns(body, header) } ).not.toThrowError();
    });

    it('should throw an error when body and header have different number of columns', () => {
      const bodyRow = tr();
      bodyRow.appendChild( td() );
      bodyRow.appendChild( td() );
      const body = tbody().appendChild(bodyRow);

      const headerRow = tr();
      headerRow.appendChild( th() );
      const header = tbody().appendChild(headerRow);
      expect( () => { service.assertBodyMatchesHeaderColumns(body, header) } ).toThrowError(/body/ig);
    });
  });

  describe('assertFooterMatchesHeaderColumnsWhenExist()', () => {
    it('should do nothing when there is no footer and header has at least one column', () => {
      let footer!: HTMLElement;

      const headerRow = tr();
      headerRow.appendChild( th() );
      const header = tbody().appendChild(headerRow);
      expect( () => { service.assertFooterMatchesHeaderColumnsWhenExist(footer, header) } ).not.toThrowError();
    });

    it('should do nothing when footer and header have the same number of columns', () => {
      const footRow = tr();
      footRow.appendChild( th() );
      footRow.appendChild( th() );
      const footer = tbody().appendChild(footRow);

      const headerRow = tr();
      headerRow.appendChild( th() );
      headerRow.appendChild( th() );
      const header = tbody().appendChild(headerRow);
      expect( () => { service.assertFooterMatchesHeaderColumnsWhenExist(footer, header) } ).not.toThrowError();
    });

    it('should throw an error when footer and header have different number of columns', () => {
      const footRow = tr();
      footRow.appendChild( th() );
      footRow.appendChild( th() );
      const foot = tbody().appendChild(footRow);

      const headerRow = tr();
      headerRow.appendChild( th() );
      const header = tbody().appendChild(headerRow);
      expect( () => { service.assertFooterMatchesHeaderColumnsWhenExist(foot, header) } ).toThrowError(/footer/ig);
    });
  });

  describe('countHtml()', () => {
    it('should return 0 when header is not supplied', () => {
      let header!: HTMLElement;
      expect( service.countHtml('th', header) ).toEqual(0);
    });

    it('should return 1 when header has one column', () => {
      const header = document.createElement('tr');
      header.appendChild( th() );
      expect( service.countHtml('th', header) ).toEqual(1);
    });

    it('should return 2 when header has two columns', () => {
      const header = tr();
      header.appendChild( th() );
      header.appendChild( th() );
      expect( service.countHtml('th', header) ).toEqual(2);
    });
  });

});

function tbody() {
  return document.createElement('tbody');
}

function th() {
  return document.createElement('th');
}

function tr() {
  return document.createElement('tr');
}

function td() {
  return document.createElement('td');
}
