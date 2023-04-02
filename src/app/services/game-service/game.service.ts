import { Inject, Injectable } from '@angular/core';
import { PlayerService } from '../player-service/player.service';
import { SYMBOLS } from 'src/app/enums/symbols';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(
    @Inject('PlayerService1') private _playerService1: PlayerService,
    @Inject('PlayerService2') private _playerService2: PlayerService
  ) {}

  public toggleTurn(): void {
    if (
      this._playerService1.isPlaying === false &&
      this._playerService2.isPlaying === false
    ) {
      this._playerService1.toggleIsPlaying();
    } else {
      this._playerService1.toggleIsPlaying();
      this._playerService2.toggleIsPlaying();
    }
  }

  public getPlayerOneSymbol(): SYMBOLS {
    return this._playerService1.symbol;
  }

  public getPlayingPlayerSymbol(): SYMBOLS | undefined {
    if (this._playerService1.isPlaying) {
      return this._playerService1.symbol;
    } else if (this._playerService2.isPlaying) {
      return this._playerService2.symbol;
    }
    return undefined;
  }

  public setPlayerOneSymbol(value: SYMBOLS): void {
    switch (value) {
      case SYMBOLS.CIRCLE:
        {
          this._playerService1.symbol = SYMBOLS.CIRCLE;
          this._playerService2.symbol = SYMBOLS.CROSS;
        }
        break;
      case SYMBOLS.CROSS:
        {
          this._playerService1.symbol = SYMBOLS.CROSS;
          this._playerService2.symbol = SYMBOLS.CIRCLE;
        }
        break;
    }
    this.toggleTurn();
  }

  public resetGame(hardReset: boolean = false): void {
    this._playerService1.reset(hardReset);
    this._playerService2.reset(hardReset);
  }

  public checkMove(
    table: (SYMBOLS | undefined)[][],
    [x, y]: [x: number, y: number]
  ): void {
    const symbol: SYMBOLS = this.getPlayingPlayerSymbol() as SYMBOLS;
    const trisConst: number = 3;

    // If the whole table does not have at least 3 playing player symbols, the player can't have won for sure
    const flatTable: Array<SYMBOLS | undefined> = table.flat(2);
    if (flatTable.filter((tile) => tile === symbol).length < trisConst) return;

    let victory: boolean = false;

    // Check n
    if (y - trisConst + 1 >= 0) {
      if (table[x][y] === table[x][y - 1] && table[x][y] === table[x][y - 2]) {
        victory = true;
      }
    }

    // Check s
    if (y + trisConst - 1 < table[0].length) {
      if (table[x][y] === table[x][y + 1] && table[x][y] === table[x][y + 2]) {
        victory = true;
      }
    }

    // Check w
    if (x - trisConst + 1 >= 0) {
      if (table[x][y] === table[x - 1][y] && table[x][y] === table[x - 2][y]) {
        victory = true;
      }
    }

    // Check e
    if (x + trisConst - 1 < table.length) {
      if (table[x][y] === table[x + 1][y] && table[x][y] === table[x + 2][y]) {
        victory = true;
      }
    }

    // Check ne
    if (y - trisConst + 1 >= 0 && x - trisConst + 1 >= 0) {
      if (
        table[x][y] === table[x - 1][y - 1] &&
        table[x][y] === table[x - 2][y - 2]
      ) {
        victory = true;
      }
    }

    // Check nw
    if (y - trisConst + 1 >= 0 && x + trisConst - 1 < table.length) {
      if (
        table[x][y] === table[x + 1][y - 1] &&
        table[x][y] === table[x + 2][y - 2]
      ) {
        victory = true;
      }
    }

    // Check se
    if (
      y + trisConst - 1 < table[0].length &&
      x + trisConst - 1 < table.length
    ) {
      if (
        table[x][y] === table[x + 1][y + 1] &&
        table[x][y] === table[x + 2][y + 2]
      ) {
        victory = true;
      }
    }

    // Check sw
    if (y + trisConst - 1 < table[0].length && x - trisConst + 1 >= 0) {
      if (
        table[x][y] === table[x - 1][y + 1] &&
        table[x][y] === table[x - 2][y + 2]
      ) {
        victory = true;
      }
    }

    // Check middle tile
    // Check we
    if (x - 1 >= 0 && x + 1 < table.length) {
      if (table[x][y] === table[x - 1][y] && table[x][y] === table[x + 1][y]) {
        victory = true;
      }
    }

    // Check ns
    if (y - 1 >= 0 && y + 1 < table[0].length) {
      if (table[x][y] === table[x][y - 1] && table[x][y] === table[x][y + 1]) {
        victory = true;
      }
    }

    // Check sw-ne
    // Check nw-se
    if (
      x - 1 >= 0 &&
      x + 1 < table.length &&
      y - 1 >= 0 &&
      y + 1 < table[0].length
    ) {
      if (
        (table[x][y] === table[x - 1][y - 1] &&
          table[x][y] === table[x + 1][y + 1]) ||
        (table[x][y] === table[x - 1][y + 1] &&
          table[x][y] === table[x + 1][y - 1])
      ) {
        victory = true;
      }
    }

    if (!victory) {
      return;
    }

    if (this._playerService1.symbol === symbol) {
      this._playerService1.addVictory();
    } else if (this._playerService2.symbol === symbol) {
      this._playerService2.addVictory();
    }
  }

  public getWinner(): SYMBOLS | undefined {
    if (this._playerService1.isWinner) return this._playerService1.symbol;
    if (this._playerService2.isWinner) return this._playerService2.symbol;
    return undefined;
  }
}
