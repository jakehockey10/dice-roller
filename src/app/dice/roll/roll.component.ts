import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { DiceService } from '../dice.service';

@Component({
  selector: 'app-roll',
  templateUrl: './roll.component.html',
  styleUrls: ['./roll.component.scss']
})
export class RollComponent implements OnInit, OnDestroy {

  @ViewChild('canvasWrapper') canvasWrapper: ElementRef;
  results: any;
  statsShowing = false;
  skyBoxShowing = false;
  numberOfDice = 2;

  constructor(
    private _self: ElementRef,
    private _diceService: DiceService
  ) { }

  ngOnInit() {
    const container = this.canvasWrapper.nativeElement;
    container.appendChild(this._diceService.rendererDOMElement);
    container.appendChild(this._diceService.statsDOMElement);
    this._diceService.statsVisible = this.statsShowing;
    this._diceService.skyBoxVisible = this.skyBoxShowing;
    this._diceService.numberOfDice = this.numberOfDice;
    this._diceService.results.subscribe(results => this.results = results);
    requestAnimationFrame(() => this.animate());
  }

  ngOnDestroy(): void {
    // window.removeEventListener('resize');
  }

  roll() {
    this._diceService.randomDiceThrow();
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

  private animate() {
    this._diceService.updatePhysics();
    this._diceService.render();
    this._diceService.update();
    requestAnimationFrame(() => this.animate());
  }

}
