import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { ChartService } from './../chart.service';
import { DiceService } from './../dice.service';
import { ChartComponent } from './chart.component';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [Ng2GoogleChartsModule],
      declarations: [ChartComponent],
      providers: [DiceService, ChartService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update chart data once when dice service broadcasts results', () => {
    const diceService = fixture.debugElement.injector.get(DiceService);
    const chartService = fixture.debugElement.injector.get(ChartService);
    const chartSpy = spyOn(chartService, 'updateChartData');
    diceService.results.next([{ value: 2, color: '#abcdef' }]);
    expect(chartSpy).toHaveBeenCalledTimes(1);
  });

  it('should redraw chart when window is resized', () => {
    const diceService = fixture.debugElement.injector.get(DiceService);
    diceService.results.next([{ value: 2, color: '#abcdef' }]);
    fixture.detectChanges();
    expect(component.chart).toBeDefined();
    const chartSpy = spyOn(component.chart, 'redraw');
    window.dispatchEvent(new Event('resize'));
    expect(chartSpy).toHaveBeenCalledTimes(1);
  });
});
