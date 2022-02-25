export class Licensee {

  readonly id!: number;
  readonly licensee!: string;

  constructor(id: number, licensee: string) {
    this.id = id;
    this.licensee = licensee;
  }

}
