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
  statsShowing = true;

  constructor(
    private _self: ElementRef,
    private _diceService: DiceService
  ) { }

  ngOnInit() {
    const container = this.canvasWrapper.nativeElement;
    container.appendChild(this._diceService.rendererDOMElement);
    container.appendChild(this._diceService.statsDOMElement);
    this._diceService.results.subscribe(results => this.results = results);
    requestAnimationFrame(() => this.animate());
  }

  ngOnDestroy(): void {
    // window.removeEventListener('resize');
  }

  roll() {
    this._diceService.randomDiceThrow();
  }

  toggleStatsVisibility() {
    this.statsShowing = this._diceService.toggleStatsVisibility();
  }

  private animate() {
    this._diceService.updatePhysics();
    this._diceService.render();
    this._diceService.update();
    requestAnimationFrame(() => this.animate());
  }

}
