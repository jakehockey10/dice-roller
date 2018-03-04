import { Component, Input, OnInit } from '@angular/core';

import { DiceValue } from '../dice-value';
import { DiceService } from './../dice.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  private _statsShowing: boolean;
  private _skyBoxShowing: boolean;
  private _numberOfDice: DiceValue;

  constructor(private _diceService: DiceService) { }

  ngOnInit() {
    if (this.statsShowing === undefined) { this.statsShowing = false; }
    if (this.skyBoxShowing === undefined) { this.skyBoxShowing = false; }
    if (this.numberOfDice === undefined) { this.numberOfDice = 2; }
  }

  get statsShowing(): boolean { return this._statsShowing; }

  @Input() set statsShowing(value: boolean) {
    this._statsShowing = value;
    this.statsShowingChange(value);
  }

  get skyBoxShowing(): boolean { return this._skyBoxShowing; }

  @Input() set skyBoxShowing(value: boolean) {
    this._skyBoxShowing = value;
    this.skyBoxShowingChange(value);
  }

  get numberOfDice(): DiceValue { return this._numberOfDice; }

  @Input() set numberOfDice(value: DiceValue) {
    this._numberOfDice = value;
    this.numberOfDiceChange(value);
  }

  private statsShowingChange(showing: boolean) {
    this._diceService.statsVisible = showing;
  }

  private skyBoxShowingChange(showing: boolean) {
    this._diceService.skyBoxVisible = showing;
  }

  private numberOfDiceChange(numberOfDice: DiceValue) {
    this._diceService.numberOfDice = numberOfDice;
  }

}
