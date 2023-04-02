import { Component, Inject } from '@angular/core';
import { PlayerService } from './services/player-service/player.service';
import { SYMBOLS } from './enums/symbols';
import { minTiles, tilesPerColumn, tilesPerRow } from './constants/constants';
import { GameService } from './services/game-service/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'tictactoe';

  public symbols: typeof SYMBOLS = SYMBOLS;

  public isPlayerChooserOpen: boolean = true;
  public isTableOpen: boolean = true;
  public isEndGameModalOpen: boolean = false;

  public endGameMsg: string = '';

  public tilesPerRow: number = 0;
  public tilesPerColumn: number = 0;

  constructor(
    private _gameService: GameService,
    @Inject('PlayerService1') public PlayerService1: PlayerService,
    @Inject('PlayerService2') public PlayerService2: PlayerService
  ) {
    this._setTilesNumber();
  }

  public onToggleOpenPlayerChooser(value: boolean | null = null): void {
    value = value ?? !this.isPlayerChooserOpen;
    this.isPlayerChooserOpen = value;
  }

  public onToggleEndGameModal(value: boolean | null = null): void {
    value = value ?? !this.isEndGameModalOpen;
    this.isEndGameModalOpen = value;

    if (!this.isEndGameModalOpen) {
      this.endGameMsg = '';
    }
  }

  public onQuit(): void {
    this.onToggleEndGameModal(false);
    this._gameService.resetGame(true);
    this._resetTable();
    this.onToggleOpenPlayerChooser(true);
  }

  public onReplay(): void {
    this.onToggleEndGameModal(false);
    this._gameService.resetGame(false);
    this._resetTable();
    this._gameService.toggleTurn();
  }

  public onEndGame(): void {
    const winner: SYMBOLS | undefined = this._gameService.getWinner();

    switch (winner) {
      case SYMBOLS.CIRCLE:
        {
          const playerOneSymbol: SYMBOLS =
            this._gameService.getPlayerOneSymbol();
          this.endGameMsg =
            playerOneSymbol === SYMBOLS.CIRCLE
              ? `Player 1 won! Congrats!`
              : `Player 2 won! Congrats!`;
        }
        break;
      case SYMBOLS.CROSS:
        {
          const playerOneSymbol: SYMBOLS =
            this._gameService.getPlayerOneSymbol();
          this.endGameMsg =
            playerOneSymbol === SYMBOLS.CROSS
              ? `Player 1 won! Congrats!`
              : `Player 2 won! Congrats!`;
        }
        break;
      case undefined:
        {
          this.endGameMsg = `Table full. It's a draw!`;
        }
        break;
    }
    this.onToggleEndGameModal(true);
  }

  private _setTilesNumber(): void {
    this.tilesPerRow = tilesPerRow < minTiles ? minTiles : tilesPerRow;
    this.tilesPerColumn = tilesPerColumn < minTiles ? minTiles : tilesPerColumn;
  }

  private _resetTable(): void {
    this.isTableOpen = false;
    setTimeout(() => {
      this.isTableOpen = true;
    }, 0);
  }
}
