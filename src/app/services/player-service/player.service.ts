import { Injectable } from '@angular/core';
import { SYMBOLS } from 'src/app/enums/symbols';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private internalSymbol: SYMBOLS = SYMBOLS.CIRCLE;
  private internalVictories: number = 0;
  private internalIsPlaying: boolean = false;
  private internalIsWinner: boolean = false;

  constructor() {
    this.reset();
  }

  get symbol(): SYMBOLS {
    return this.internalSymbol;
  }
  set symbol(value: SYMBOLS) {
    this.internalSymbol = value;
  }

  get victories(): number {
    return this.internalVictories;
  }
  set victories(value: number) {
    this.internalVictories = value;
  }

  get isPlaying(): boolean {
    return this.internalIsPlaying;
  }
  set isPlaying(value: boolean) {
    this.internalIsPlaying = value;
  }

  get isWinner(): boolean {
    return this.internalIsWinner;
  }
  set isWinner(value: boolean) {
    this.internalIsWinner = value;
  }

  public reset(hardReset: boolean = false): void {
    if (hardReset) {
      this.internalSymbol = SYMBOLS.CIRCLE;
      this.internalVictories = 0;
    }
    this.toggleIsPlaying(false);
    this.toggleIsWinner(false);
  }

  public addVictory(): void {
    this.victories = ++this.victories;
    this.toggleIsWinner(true);
  }

  public toggleIsPlaying(value: boolean | null = null): void {
    value = value ?? !this.isPlaying;
    this.isPlaying = value;
  }

  public toggleIsWinner(value: boolean | null = null): void {
    value = value ?? !this.isWinner;
    this.isWinner = value;
  }
}
