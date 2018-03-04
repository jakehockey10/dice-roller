import { inject, TestBed } from '@angular/core/testing';

import { ChartService } from './chart.service';

describe('ChartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartService]
    });
  });

  it('should be created', inject([ChartService], (service: ChartService) => {
    expect(service).toBeTruthy();
  }));

  it('should have empty chartData', inject([ChartService], (service: ChartService) => {
    expect(service.chartDataTable).toEqual([
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ]);
  }));

  it('should update chart data with results from throw of 1 dice', inject([ChartService], (service: ChartService) => {
    service.updateChartData([{ value: 2, color: '#ffffff' }]);
    expect(service.chartDataTable).toEqual([
      [0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ]);
  }));

  it('should update chart data with results from throw of 2 dice', inject([ChartService], (service: ChartService) => {
    service.updateChartData([{ value: 4, color: '#aaaaaa' }, { value: 5, color: '#bbbbbb' }]);
    expect(service.chartDataTable).toEqual([
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ]);
  }));

  it('should update chart data multiple times from multiple throws', inject([ChartService], (service: ChartService) => {
    service.updateChartData([{ value: 1, color: '#cccccc' }, { value: 3, color: '#dddddd' }, { value: 2, color: '#eeeeee' }]);
    service.updateChartData([{ value: 5, color: '#cccccc' }, { value: 1, color: '#dddddd' }, { value: 3, color: '#eeeeee' }]);
    service.updateChartData([{ value: 6, color: '#cccccc' }, { value: 4, color: '#dddddd' }, { value: 3, color: '#eeeeee' }]);
    service.updateChartData([{ value: 3, color: '#cccccc' }, { value: 5, color: '#dddddd' }, { value: 2, color: '#eeeeee' }]);
    service.updateChartData([{ value: 1, color: '#111111' }]);
    service.updateChartData([{ value: 1, color: '#111111' }]);
    service.updateChartData([{ value: 1, color: '#111111' }]);
    service.updateChartData([{ value: 1, color: '#111111' }]);
    expect(service.chartDataTable).toEqual([
      [4, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [2, 2, 4, 1, 2, 1],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ]);
  }));
});
