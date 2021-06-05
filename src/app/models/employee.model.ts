export class Employee {

  readonly officeSurface: number = Math.trunc(  Math.random() * 100  );

  constructor(
    public readonly id:      number,
    public readonly name:    string,
    public readonly surname: string,
    public readonly age:     number,
  ) {}

}