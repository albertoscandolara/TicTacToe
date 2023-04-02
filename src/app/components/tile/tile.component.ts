import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SYMBOLS } from 'src/app/enums/symbols';
import { GameService } from 'src/app/services/game-service/game.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
})
export class TileComponent implements OnInit {
  @Input() public rowIndex: number = 0;
  @Input() public columnIndex: number = 0;

  public symbols: typeof SYMBOLS = SYMBOLS;
  public symbol: SYMBOLS | undefined;

  @Output() OnClick: EventEmitter<[number, number]> = new EventEmitter();
  constructor(private _gameService: GameService) {}

  ngOnInit(): void {}

  onClick() {
    if (this.symbol) {
      return;
    }
    this.symbol = this._gameService.getPlayingPlayerSymbol();
    this.OnClick.emit([this.rowIndex, this.columnIndex]);
    this._gameService.toggleTurn();
  }
}
