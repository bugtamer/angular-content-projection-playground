import { DigitalRootPipe } from './digital-root.pipe';
import { Component } from '@angular/core';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';

const naturalNumber = 1234567890;
const digitalRoot = 9;

@Component({
  selector: 'app-test',
  template: '<p>{{ number | digitalRoot }}</p>'
})
export class TestComponent {
  readonly number = naturalNumber;
}


describe('DigitalRootPipe', () => {

  let fixture!: ComponentFixture<TestComponent>;
  let compiled!: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        DigitalRootPipe
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  }));

  it('create an instance', () => {
    const pipe = new DigitalRootPipe();
    expect(pipe).toBeTruthy();
  });

  it(`should return ${digitalRoot} as digital root of ${naturalNumber}`, () => {
    expect(compiled?.querySelector('p')?.textContent).toContain(digitalRoot);
  });

});
