import { Injectable } from '@angular/core';
import { InputGuardService } from 'src/app/services/input-guard.service';

const CAPTION_INPUT = '<ng-template #tableCaption></ng-template>';
const HEADER_INPUT  = '<ng-template #tableHeader></ng-template>';
const BODY_INPUT    = '<ng-template #tableBody let-var></ng-template>';
const FOOTER_INPUT  = '<ng-template #tableFooter></ng-template>';

const COLUMNS_SELECTOR_FOR_HEADER = 'th';
const COLUMNS_SELECTOR_FOR_FOOTER = 'th';
const COLUMNS_SELECTOR_FOR_BODY   = 'tr:nth-child(1) > td';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private inputGuardService: InputGuardService) { }

  assertCaptionExist(element: HTMLElement): void {
    this.inputGuardService.string(CAPTION_INPUT, element?.innerText);
  }

  assertHeaderExist(element: HTMLElement): void {
    const definedHeaderColumns = this.countHtml(COLUMNS_SELECTOR_FOR_HEADER, element);
    this.inputGuardService.minNumber(HEADER_INPUT, definedHeaderColumns, 1);
  }

  assertBodyMatchesHeaderColumns(body: HTMLElement, header: HTMLElement): void {
    const definedBodyColumns   = this.countHtml(COLUMNS_SELECTOR_FOR_BODY,   body);
    const definedHeaderColumns = this.countHtml(COLUMNS_SELECTOR_FOR_HEADER, header);
    this.inputGuardService.expectedNumber(BODY_INPUT, definedBodyColumns, definedHeaderColumns);
  }

  assertFooterMatchesHeaderColumnsWhenExist(footer: HTMLElement, header: HTMLElement): void {
    const definedFooterColumns = this.countHtml(COLUMNS_SELECTOR_FOR_FOOTER, footer);
    const definedHeaderColumns = this.countHtml(COLUMNS_SELECTOR_FOR_HEADER, header);
    if (definedFooterColumns > 0) {
      this.inputGuardService.expectedNumber(FOOTER_INPUT, definedFooterColumns, definedHeaderColumns);
    }
  }

  countHtml(cssSelector: string, element: HTMLElement): number {
    return element?.querySelectorAll(cssSelector)?.length || 0;
  }

}
