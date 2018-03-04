import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { DiceService } from '../dice.service';
import { ThrowSpeed } from '../throw-speed.enum';
import { CurrentRollComponent } from './../current-roll/current-roll.component';

@Component({
  selector: 'app-roll',
  templateUrl: './roll.component.html',
  styleUrls: ['./roll.component.scss']
})
export class RollComponent implements OnInit, OnDestroy {

  @ViewChild('canvasWrapper') canvasWrapper: ElementRef;
  @ViewChild(CurrentRollComponent) currentRoll: CurrentRollComponent;

  constructor(private _diceService: DiceService) { }

  ngOnInit() {
    const container = this.canvasWrapper.nativeElement;
    container.appendChild(this._diceService.rendererDOMElement);
    container.appendChild(this._diceService.statsDOMElement);
    this._diceService.results.subscribe(results => {
      if (results) { this.currentRoll.results = results }
    });
    requestAnimationFrame(() => this.animate());
  }

  ngOnDestroy(): void {
    // TODO: Is this needed?
    // window.removeEventListener('resize');
  }

  roll(throwSpeed: ThrowSpeed) {
    this._diceService.randomDiceThrow(throwSpeed);
  }

  private animate() {
    this._diceService.updatePhysics();
    this._diceService.render();
    this._diceService.update();
    requestAnimationFrame(() => this.animate());
  }

}
