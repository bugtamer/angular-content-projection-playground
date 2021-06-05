import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSuffix]'
})
export class SuffixDirective {

  @Input('appSuffix') suffix!: string;

  constructor(private elementRef: ElementRef) {
    this.input = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.input.value = SuffixDirective.format(this.input.value, this.suffix);
  }

  @HostListener("focus", ["$event.target.value"])
  onFocus(value: string) {
    this.input.value = SuffixDirective.unformat(value, this.suffix);
  }

  @HostListener("blur", ["$event.target.value"])
  onBlur(value: string) {
    this.input.value = SuffixDirective.format(value, this.suffix);
  }

  static format(value: string, suffix: string): string {
    return value.length > 0 ? `${value} ${suffix}` : `${value}`;
  }

  static unformat(value: string, suffix: string): string {
    const begin = 0;
    const end   = value.length - suffix.length - 1
    return value.substr(begin, end);
  }

  private input: HTMLInputElement;

}
