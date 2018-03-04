import { Injectable } from '@angular/core';

@Injectable()
export class ChartService {

  private chartData = {
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

  constructor() { }

  // TODO: Get rid of that any!
  updateChartData(results: any) {
    const rowIndex = results.length;
    results.forEach(result => {
      const columnIndex = this.findColumnIndex(result);
      (<number>this.chartData.dataTable[rowIndex][columnIndex])++;
    });
    this.chartData = Object.create(this.chartData);
    return this.chartData;
  }

  // TODO: Get rid of that any!
  private findColumnIndex(result: any) {
    const headerRow = this.chartData.dataTable[0];
    return headerRow.findIndex(headerCell => headerCell.toString().split(' ')[2] === result.value.toString());
  }

}
