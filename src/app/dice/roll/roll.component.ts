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

  private _animationHandle: number;

  constructor(private _diceService: DiceService) { }

  ngOnInit() {
    const container = this.canvasWrapper.nativeElement;
    container.appendChild(this._diceService.rendererDOMElement);
    container.appendChild(this._diceService.statsDOMElement);
    this._diceService.results.subscribe(results => {
      if (results) { this.currentRoll.results = results }
    });
    this._animationHandle = requestAnimationFrame(() => this.animate());
  }

  ngOnDestroy(): void {
    // TODO: How should I test this?  Without dealing with the animation handle,
    // going back and forth between pages would add yet another animation loop
    // on top of what was already going on.  This fixes that.  But how do I 
    // test/prove that?
    cancelAnimationFrame(this._animationHandle);
    this._animationHandle = undefined;
  }

  roll(throwSpeed: ThrowSpeed) {
    this._diceService.randomDiceThrow(throwSpeed);
  }

  private animate() {
    this._animationHandle = undefined;
    this._diceService.updatePhysics();
    this._diceService.render();
    this._diceService.update();
    this._animationHandle = requestAnimationFrame(() => this.animate());
  }

}
