import { Component, Input, OnInit } from '@angular/core';

import { DiceService } from './../dice.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  @Input() statsShowing: boolean;
  @Input() skyBoxShowing: boolean;
  @Input() numberOfDice: number;

  constructor(private _diceService: DiceService) { }

  ngOnInit() {
    if (this.statsShowing === undefined) { this.statsShowing = false; }
    if (this.skyBoxShowing === undefined) { this.skyBoxShowing = false; }
    if (this.numberOfDice === undefined) { this.numberOfDice = 2; }
    this._diceService.statsVisible = this.statsShowing;
    this._diceService.skyBoxVisible = this.skyBoxShowing;
    this._diceService.numberOfDice = this.numberOfDice;
  }

  statsShowingChange(showing: boolean) {
    this._diceService.statsVisible = showing;
  }

  skyBoxShowingChange(showing: boolean) {
    this._diceService.skyBoxVisible = showing;
  }

  numberOfDiceChange(numberOfDice: number) {
    this._diceService.numberOfDice = numberOfDice;
  }

}
