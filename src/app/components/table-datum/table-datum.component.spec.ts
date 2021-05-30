import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDatumComponent } from './table-datum.component';

describe('TableDatumComponent', () => {
  let component: TableDatumComponent;
  let fixture: ComponentFixture<TableDatumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableDatumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDatumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
