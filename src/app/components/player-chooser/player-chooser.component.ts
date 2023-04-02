import { Component, EventEmitter, Output } from '@angular/core';
import { SYMBOLS } from 'src/app/enums/symbols';
import { GameService } from 'src/app/services/game-service/game.service';

@Component({
  selector: 'app-player-chooser',
  templateUrl: './player-chooser.component.html',
  styleUrls: ['./player-chooser.component.scss'],
})
export class PlayerChooserComponent {
  @Output() public OnClose: EventEmitter<void> = new EventEmitter();

  constructor(private _gameService: GameService) {}

  public setPlayerOneCircle(): void {
    this._gameService.setPlayerOneSymbol(SYMBOLS.CIRCLE);
    this.OnClose.emit();
  }

  public setPlayerOneCross(): void {
    this._gameService.setPlayerOneSymbol(SYMBOLS.CROSS);
    this.OnClose.emit();
  }
}
