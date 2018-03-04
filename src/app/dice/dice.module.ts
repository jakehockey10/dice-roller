import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiModule } from './../ui/ui.module';
import { DiceRoutingModule } from './dice-routing.module';
import { RollComponent } from './roll/roll.component';
import { DiceService } from './dice.service';

@NgModule({
  imports: [
    CommonModule,
    DiceRoutingModule,
    UiModule
  ],
  declarations: [RollComponent],
  providers: [DiceService]
})
export class DiceModule { }
