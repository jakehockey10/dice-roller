import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UiModule } from './../ui/ui.module';
import { DiceRoutingModule } from './dice-routing.module';
import { DiceService } from './dice.service';
import { RollComponent } from './roll/roll.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DiceRoutingModule,
    UiModule
  ],
  declarations: [RollComponent],
  providers: [DiceService]
})
export class DiceModule { }
