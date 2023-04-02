import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { minTiles } from 'src/app/constants/constants';
import { SYMBOLS } from 'src/app/enums/symbols';
import { GameService } from 'src/app/services/game-service/game.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  private internalRows: Array<number> = [];
  private internalColumns: Array<number> = [];
  public minTiles: number = minTiles;

  private _table: (SYMBOLS | undefined)[][] | undefined;

  @Output() public OnEndGame: EventEmitter<void> = new EventEmitter();

  constructor(private _gameService: GameService) {}
  ngOnInit(): void {
    this._initTable();
  }

  get rows(): Array<number> {
    return this.internalRows;
  }
  @Input() set rowsCount(value: number) {
    this.internalRows = Array(value).fill(0);
  }

  get columns(): Array<number> {
    return this.internalColumns;
  }
  @Input() set columnsCount(value: number) {
    this.internalColumns = Array(value).fill(0);
  }

  public onTileClick(
    coordinates: [rowIndex: number, columnIndex: number]
  ): void {
    if (!this._table) return;

    this._table = this._table as (SYMBOLS | undefined)[][];
    const [rowIndex, columnIndex]: [rowIndex: number, columnIndex: number] =
      coordinates;
    this._table[rowIndex][columnIndex] =
      this._gameService.getPlayingPlayerSymbol() as SYMBOLS;
    this._gameService.checkMove(this._table, [rowIndex, columnIndex]);

    // Use setTimeout to let symbol to be drawn before end game checking
    setTimeout(() => {
      this._table = this._table as (SYMBOLS | undefined)[][];
      const winner: SYMBOLS | undefined = this._gameService.getWinner();
      const haveWinner: boolean = !winner ? false : true;

      const flatTable: Array<SYMBOLS | undefined> = this._table.flat(2);
      const allTilesUsed: boolean = flatTable.every((tile) => tile);

      if (haveWinner || allTilesUsed) {
        this.OnEndGame.emit();
      }
    }, 0);
  }

  private _initTable(): void {
    this._table = Array(this.internalRows.length)
      .fill(Array(this.internalColumns.length).fill(undefined))
      .map((a) => a.slice());
    console.log(this._table);
  }
}
