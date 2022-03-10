import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() data: Array<any> = [];
  @Input() currentPage: number = 0;
  @Input() rowsPerPage: number = 15;

  @Output() page = new EventEmitter<number>();


  label = {
    first: '|«',
    prev:  '«',
    next:  '»',
    last:  '»|',
  }


  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.goToPage(this.currentPage);
  }


  // methods to navigate among pages


  goToPage(page: number): void {
    this.currentPage = Math.max(this.firstPage, page);
    this.currentPage = Math.min(this.lastPage, this.currentPage);
    this.page.emit(this.currentPage);
  }


  get firstPage(): number {
    return 0;
  }


  get lastPage(): number {
    const remainder = this.totalRows % this.rowsPerPage;
    const lastPageZeroBased =  Math.trunc(this.totalRows / this.rowsPerPage) - 1;
    return (remainder === 0) ? lastPageZeroBased : lastPageZeroBased + 1;
  }


  get nextPage(): number {
    return Math.min(this.lastPage, this.currentPage + 1);
  }


  get prevPage(): number {
    return Math.max(this.firstPage, this.currentPage - 1);
  }


  // methods to manage table row visibility


  get firstVisibleRow(): number {
    const start = this.currentPage * this.rowsPerPage;
    return Math.min(this.lastRow, start);
  }


  get lastVisibleRow(): number {
    let end = this.firstVisibleRow + this.rowsPerPage;
    return Math.min(this.lastRow, end);
  }


  // methods to disable buttons


  get isFirstPage(): boolean {
    return this.currentPage === this.firstPage;
  }


  get isLastPage(): boolean {
    return this.currentPage === this.lastPage;
  }


  // IMPLEMENTATION DETAILS


  private get totalRows(): number {
    return this.data.length;
  }


  private get firstRow(): number {
    return 0;
  }


  private get lastRow(): number {
    return Math.max(this.firstRow, this.totalRows);
  }

}
