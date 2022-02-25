import { Release } from './release.model';


export class Game {

  /** Game ID */
  id!: number;

  /** Document page where the game is listed */
  page!: number;

  /** Game name */
  title!: string;

  /** Licensee ID */
  licensee!: number;

  /** Year month release date */
  release!: Release;



  released(): string {
    return `${this.release.year}-${this.release.month}`;
  }

  get licenseeId(): number {
    return this.licensee;
  }

  set licenseeId(id: number) {
    this.licensee = id;
  }

}
