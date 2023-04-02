import { NgModule, Type } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TileComponent } from './components/tile/tile.component';
import { ModalComponent } from './components/modal/modal.component';
import { PlayerChooserComponent } from './components/player-chooser/player-chooser.component';
import { AppCrossSvgComponent } from './components/svg/app-cross-svg/app-cross.svg.component';
import { AppCircleSvgComponent } from './components/svg/app-circle-svg/app-circle.svg.component';
import { PlayerService } from './services/player-service/player.service';
import { TableComponent } from './components/table/table.component';

const svgComponents: (any[] | Type<any>)[] | undefined = [
  AppCircleSvgComponent,
  AppCrossSvgComponent,
];
@NgModule({
  declarations: [
    ...svgComponents,
    AppComponent,
    TileComponent,
    ModalComponent,
    PlayerChooserComponent,
    TableComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    { provide: 'PlayerService1', useClass: PlayerService },
    { provide: 'PlayerService2', useClass: PlayerService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
