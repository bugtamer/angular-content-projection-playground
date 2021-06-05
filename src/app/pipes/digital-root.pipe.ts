import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'digitalRoot'
})
export class DigitalRootPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): number {
    return this.digitalRoot(value);
  }

  private digitalRoot(naturalNumber: number): number {
    let sum = 0;
    const digitList = naturalNumber.toString().split('');
    digitList.forEach(digit => sum += +digit);
    return (sum.toString().length === 1) ? sum : this.digitalRoot(sum);
  }

}
