import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GoogleChartComponent } from 'ng2-google-charts';

import { DiceService } from '../dice.service';

@Component({
  selector: 'app-roll',
  templateUrl: './roll.component.html',
  styleUrls: ['./roll.component.scss']
})
export class RollComponent implements OnInit, OnDestroy {

  @ViewChild('canvasWrapper') canvasWrapper: ElementRef;
  @ViewChild('chart') chart: GoogleChartComponent;
  results: any;
  statsShowing = false;
  skyBoxShowing = false;
  numberOfDice = 2;
  chartData = {
    chartType: 'ComboChart',
    dataTable: [
      ['# of Dice', 'Occurrences of 1', 'Occurrences of 2', 'Occurrences of 3', 'Occurrences of 4', 'Occurrences of 5', 'Occurrences of 6'],
      ['1 dice thrown', 0, 0, 0, 0, 0, 0],
      ['2 dice thrown', 0, 0, 0, 0, 0, 0],
      ['3 dice thrown', 0, 0, 0, 0, 0, 0],
      ['4 dice thrown', 0, 0, 0, 0, 0, 0],
      ['5 dice thrown', 0, 0, 0, 0, 0, 0],
      ['6 dice thrown', 0, 0, 0, 0, 0, 0],
    ],
    options: {
      title: '',
      vAxis: { title: 'Occurred' },
      hAxis: { title: '# of Dice' },
      seriesType: 'bars',
      legend: 'none'
    }
  };

  constructor(
    private _self: ElementRef,
    private _diceService: DiceService
  ) { }

  ngOnInit() {
    window.addEventListener('resize', () => {
      this.chart.redraw();
    });
    const container = this.canvasWrapper.nativeElement;
    container.appendChild(this._diceService.rendererDOMElement);
    container.appendChild(this._diceService.statsDOMElement);
    this._diceService.statsVisible = this.statsShowing;
    this._diceService.skyBoxVisible = this.skyBoxShowing;
    this._diceService.numberOfDice = this.numberOfDice;
    this._diceService.results.subscribe(results => {
      this.results = results;
      if (this.results) {
        const rowIndex = this.results.length;
        this.results.forEach(result => {
          const columnIndex = this.chartData.dataTable[0].findIndex(header => header.toString().split(' ')[2] === result.value.toString());
          (<number>this.chartData.dataTable[rowIndex][columnIndex])++;
        });
        this.chartData = Object.create(this.chartData);
      }
    });
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
