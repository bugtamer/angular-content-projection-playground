import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appInjector]'
})
export class InjectorDirective {

  @Input('appInjector') name!: string;

  constructor(public templateRef: TemplateRef<any>) { }

}
