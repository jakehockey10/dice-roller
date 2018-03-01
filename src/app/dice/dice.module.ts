import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DiceRoutingModule } from './dice-routing.module';
import { RollComponent } from './roll/roll.component';

@NgModule({
  imports: [
    CommonModule,
    DiceRoutingModule
  ],
  declarations: [RollComponent]
})
export class DiceModule { }
