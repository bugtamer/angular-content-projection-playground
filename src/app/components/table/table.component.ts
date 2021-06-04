import { Component, Input, AfterContentInit, AfterViewInit } from '@angular/core';
import { ContentChildren, QueryList, ViewChild, ElementRef } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { InjectorDirective } from 'src/app/directives/injector/injector.directive';
import { TableService } from './services/table.service';
import { TemplateRefDictionary } from './models/template-ref-dictionary.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [TableService]
})
export class TableComponent implements AfterContentInit, AfterViewInit {

  @Input() data: Array<Employee> = [];

  @ContentChildren(InjectorDirective) injectedTemplateList!: QueryList<InjectorDirective>;

  @ViewChild('caption') captionRef!: ElementRef;
  @ViewChild('header')  headerRef!:  ElementRef;
  @ViewChild('body')    bodyRef!:    ElementRef;
  @ViewChild('footer')  footerRef!:  ElementRef;

  sectionTemplateRef: TemplateRefDictionary = { };

  constructor(private tableService: TableService) { }

  ngAfterContentInit(): void {
    this.tableService.bindInjectedTemplatesToTable(this);
  }

  ngAfterViewInit(): void {
    this.tableService.assertCaptionExist(this);
    this.tableService.assertThereIsAtLeastOneHeaderColumn(this);
    this.tableService.assertBodyHasSameColumnsThanHeader(this);
    this.tableService.assertFooterHasSameColumnsThanHeaderWhenExist(this);
  }

}
