import { Injectable, ElementRef } from '@angular/core';
import { InputGuardService } from 'src/app/services/input-guard.service';
import { TableComponent } from '../table.component';
import { InjectorDirective } from 'src/app/directives/injector/injector.directive';

const ALLOWED_SECTIONS = ['caption', 'header', 'body', 'footer'];

const CAPTION_INPUT = '<ng-template appInjector="caption"></ng-template>';
const HEADER_INPUT = '<ng-template appInjector="header"></ng-template>';
const BODY_INPUT = '<ng-template appInjector="body" let-var></ng-template>';
const FOOTER_INPUT = '<ng-template appInjector="footer"></ng-template>';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private inputGuardService: InputGuardService) { }

  assertCaptionExist(tableComponent: TableComponent) {
    const caption = tableComponent?.captionRef?.nativeElement?.innerText;
    this.inputGuardService.string(CAPTION_INPUT, caption);
  }

  assertThereIsAtLeastOneHeaderColumn(tableComponent: TableComponent) {
    const numHeaderCols = this.countColumns(tableComponent?.headerRef, 'th');
    this.inputGuardService.minNumber(HEADER_INPUT, numHeaderCols, 1);
  }

  assertBodyHasSameColumnsThanHeader(tableComponent: TableComponent) {
    const numBodyCols   = this.countColumns(tableComponent?.bodyRef,   'tr:nth-child(1) > td');
    const numHeaderCols = this.countColumns(tableComponent?.headerRef, 'th');
    this.inputGuardService.expectedNumber(BODY_INPUT, numBodyCols, numHeaderCols);
  }

  assertFooterHasSameColumnsThanHeaderWhenExist(tableComponent: TableComponent) {
    const numFooterCols = this.countColumns(tableComponent?.footerRef, 'th');
    if (numFooterCols > 0) {
      const numHeaderCols = this.countColumns(tableComponent?.headerRef, 'th');
      this.inputGuardService.expectedNumber(FOOTER_INPUT, numFooterCols, numHeaderCols);
    }
  }

  bindInjectedTemplatesToTable(tableComponent: TableComponent): void {
    tableComponent.injectedTemplateList.forEach(
      injectedSection => this.addSectionToTable(injectedSection, tableComponent)
    );
  }

  private addSectionToTable(section: InjectorDirective, tableComponent: TableComponent): void {
    if (ALLOWED_SECTIONS.includes(section.name))
      tableComponent.sectionTemplateRef[section.name] = section.templateRef;
    else
      throw new Error(`The template name '${section.name}' does not found.`);
  }

  private countColumns(sectionRef: ElementRef<any>, targetTag: string): number {
    return (sectionRef?.nativeElement as Element)?.querySelectorAll(targetTag)?.length || 0;
  }

}
