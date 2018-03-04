import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleChartComponent } from 'ng2-google-charts';

import { ChartService } from './../chart.service';
import { DiceService } from './../dice.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @ViewChild('chart') chart: GoogleChartComponent;

  chartData: {
    chartType: string,
    dataTable: (string | number)[][],
    options: { title: string, vAxis: { title: string }, hAxis: { title: string }, seriesType: string, legend?: string }
  };

  constructor(
    private _diceService: DiceService,
    private _chartService: ChartService
  ) { }

  ngOnInit() {
    window.addEventListener('resize', () => this.chart.redraw());
    this._diceService.results.subscribe(results => {
      if (results) { this.chartData = this._chartService.updateChartData(results); }
    });
  }

}
