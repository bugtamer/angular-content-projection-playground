import {
  Component,
  AfterViewInit,
  Input,
  ContentChild,
  ViewChild,
  TemplateRef,
  ElementRef,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef
} from '@angular/core';
import { OriginalDataOrderBackup } from './models/original-data-order-backup.model';
import { PaginationComponent } from './../pagination/pagination.component';
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
export class TableComponent implements OnInit, OnChanges, AfterViewInit {

  // component interface

  @Input() data: Array<object> = [];

  @Input() currentPage: number = 5;
  @Input() rowsPerPage: number = 5;
  @Input() hasPagination: boolean = true;

  indexedData: Array< OriginalDataOrderBackup<object> > = [];
  filteredData: Array< OriginalDataOrderBackup<object> > = [];

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

  @ViewChild(PaginationComponent) paginationComponent!: PaginationComponent;

  // component life cycle

  constructor(private tableService: TableService, private changeDetector: ChangeDetectorRef) { }


  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.updateRowsPerPage(changes);
    this.updateCurrentPage(changes);
    this.dataIndexer(changes);
  }


  ngAfterViewInit(): void {
    this.tableService.assertCaptionExist(this.captionRef.nativeElement);
    this.tableService.assertHeaderExist(this.headerRef.nativeElement);
    this.tableService.assertBodyMatchesHeaderColumns(this.bodyRef.nativeElement, this.headerRef.nativeElement);
    // this.tableService.assertFooterMatchesHeaderColumnsWhenExist(this.footerRef.nativeElement, this.headerRef.nativeElement);
    this.onPageChange();
  }


  onPageChange(page?: number): void {
    if (this.hasPagination && this.paginationComponent) {
      const start = this.paginationComponent.firstVisibleRow;
      const end   = this.paginationComponent.lastVisibleRow;
      this.filteredData = this.indexedData.slice(start, end);
      this.changeDetector.detectChanges();
      // console.debug('start', start, 'end', end, 'data:', JSON.stringify(this.data), 'filteredData:', JSON.stringify(this.filteredData))
      console.debug('size', this.filteredData.length, 'filteredData:', JSON.stringify(this.filteredData))
    }
  }

  filteredIndex(row: number): number {
    return this.paginationComponent.currentPage * this.paginationComponent.rowsPerPage + row;
  }


  private dataIndexer(changes: SimpleChanges): void {
    const dataChange = changes['data'];
    if (dataChange) {
      console.debug('dataIndexer()')
      const data = dataChange.currentValue as Array<object>;
      let index = 0;
      this.indexedData = data.map(datum => new OriginalDataOrderBackup(index++, datum));
      this.filteredData = [ ... this.indexedData ];
      this.onPageChange();
    }
  }


  private updateCurrentPage(changes: SimpleChanges): void {
    const currentPageChange = changes['currentPage'];
    if (currentPageChange) {
      this.paginationComponent.currentPage = currentPageChange.currentValue as number;
    }
  }


  private updateRowsPerPage(changes: SimpleChanges): void {
    const rowsPerPageChange = changes['rowsPerPage'];
    if (rowsPerPageChange) {
      this.paginationComponent.rowsPerPage = rowsPerPageChange.currentValue as number;
    }
  }

}
