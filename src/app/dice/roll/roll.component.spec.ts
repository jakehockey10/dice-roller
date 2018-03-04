import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { ChartService } from './../chart.service';
import { ChartComponent } from './../chart/chart.component';
import { CurrentRollComponent } from './../current-roll/current-roll.component';
import { DiceService } from './../dice.service';
import { SettingsComponent } from './../settings/settings.component';
import { RollComponent } from './roll.component';

describe('RollComponent', () => {
  let component: RollComponent;
  let fixture: ComponentFixture<RollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, Ng2GoogleChartsModule],
      declarations: [RollComponent, SettingsComponent, CurrentRollComponent, ChartComponent],
      providers: [DiceService, ChartService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
