import { Component, Input, AfterViewInit, ContentChild, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { TableService } from './services/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [TableService]
})
export class TableComponent implements AfterViewInit {

  @Input() data: Array<object> = [];

  @ContentChild('TableCaption') captionTemplateRef!: TemplateRef<unknown>;
  @ContentChild('TableHeader')  headerTemplateRef!:  TemplateRef<unknown>;
  @ContentChild('TableBody')    bodyTemplateRef!:    TemplateRef<unknown>;
  @ContentChild('TableFooter')  footerTemplateRef!:  TemplateRef<unknown>;

  @ViewChild('caption') captionRef!: ElementRef<HTMLElement>;
  @ViewChild('header')  headerRef!:  ElementRef<HTMLElement>;
  @ViewChild('body')    bodyRef!:    ElementRef<HTMLElement>;
  @ViewChild('footer')  footerRef!:  ElementRef<HTMLElement>;

  constructor(private tableService: TableService) { }

  ngAfterViewInit(): void {
    this.tableService.assertCaptionExist(this);
    this.tableService.assertHeaderExist(this);
    this.tableService.assertBodyMatchesHeaderColumns(this);
    this.tableService.assertFooterMatchesHeaderColumnsWhenExist(this);
  }

}
