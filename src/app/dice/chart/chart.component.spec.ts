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
});
