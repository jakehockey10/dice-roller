import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';

@NgModule({
  imports: [BrowserAnimationsModule, ClarityModule],
  exports: [ClarityModule]
})
export class UiModule { }
