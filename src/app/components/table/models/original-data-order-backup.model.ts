export class OriginalDataOrderBackup<T> {

  constructor(private readonly originalOrder: number, private readonly datum: T) { }

  get index(): number {
    return this.originalOrder;
  }

  get item(): T {
    return this.datum;
  }

}
