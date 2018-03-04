import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { UiModule } from './../ui/ui.module';
import { DiceRoutingModule } from './dice-routing.module';
import { DiceService } from './dice.service';
import { RollComponent } from './roll/roll.component';
import { ChartService } from './chart.service';
import { SettingsComponent } from './settings/settings.component';
import { ChartComponent } from './chart/chart.component';
import { CurrentRollComponent } from './current-roll/current-roll.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DiceRoutingModule,
    UiModule,
    Ng2GoogleChartsModule
  ],
  declarations: [RollComponent, SettingsComponent, ChartComponent, CurrentRollComponent],
  providers: [DiceService, ChartService]
})
export class DiceModule { }
