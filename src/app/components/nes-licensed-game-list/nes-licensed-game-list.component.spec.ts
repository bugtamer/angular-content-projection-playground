import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NesLicensedGameListComponent } from './nes-licensed-game-list.component';

describe('NesLicensedGameListComponent', () => {
  let component: NesLicensedGameListComponent;
  let fixture: ComponentFixture<NesLicensedGameListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NesLicensedGameListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NesLicensedGameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
