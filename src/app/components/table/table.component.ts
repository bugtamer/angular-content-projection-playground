import { Component, AfterViewInit, Input, ContentChild, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { TableService } from './services/table.service';

/**
 * @see README.md
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [TableService]
})
export class TableComponent implements AfterViewInit {

  // component interface

  @Input() data: Array<object> = [];

  // content projected references

  @ContentChild('TableCaption') captionTemplateRef!: TemplateRef<unknown>;
  @ContentChild('TableHeader')   headerTemplateRef!: TemplateRef<unknown>;
  @ContentChild('TableBody')       bodyTemplateRef!: TemplateRef<unknown>;
  @ContentChild('TableFooter')   footerTemplateRef!: TemplateRef<unknown>;

  // component template references

  @ViewChild('caption') captionRef!: ElementRef<HTMLElement>;
  @ViewChild('header')   headerRef!: ElementRef<HTMLElement>;
  @ViewChild('body')       bodyRef!: ElementRef<HTMLElement>;
  @ViewChild('footer')   footerRef!: ElementRef<HTMLElement>;

  // component life cycle

  constructor(private tableService: TableService) { }

  ngAfterViewInit(): void {
    this.tableService.assertCaptionExist(this.captionRef.nativeElement);
    this.tableService.assertHeaderExist(this.headerRef.nativeElement);
    this.tableService.assertBodyMatchesHeaderColumns(this.bodyRef.nativeElement, this.headerRef.nativeElement);
    this.tableService.assertFooterMatchesHeaderColumnsWhenExist(this.footerRef.nativeElement, this.headerRef.nativeElement);
  }

}
