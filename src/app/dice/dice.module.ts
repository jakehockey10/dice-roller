import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiModule } from './../ui/ui.module';
import { DiceRoutingModule } from './dice-routing.module';
import { RollComponent } from './roll/roll.component';

@NgModule({
  imports: [
    CommonModule,
    DiceRoutingModule,
    UiModule
  ],
  declarations: [RollComponent]
})
export class DiceModule { }
