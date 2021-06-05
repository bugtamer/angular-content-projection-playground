import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuffixDirective } from './suffix.directive';

const unformated = '23';
const suffix = 'm²';
const formated = `${unformated} ${suffix}`;


@Component({
  template: `<input type="text" autofocus value="${unformated}" appSuffix="${suffix}">`
})
class TestComponent { }


describe('SuffixDirective', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: HTMLElement;
  let input: HTMLInputElement | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponent, SuffixDirective ]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement.nativeElement;
    input = debugElement.querySelector('input');
  });

  // fit('should create an instance', () => {
  //   expect(directive).toBeTruthy();
  // });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it(`should show '${unformated}' when the target input is focused`, () => {
    expect(input?.value).toBe(unformated);
  })
  
  it(`should show '${formated}' when the target input is blured`, () => {
    input?.blur();
    fixture.detectChanges();
    expect(input?.value).toBe(formated);
  })

});
