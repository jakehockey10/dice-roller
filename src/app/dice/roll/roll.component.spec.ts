import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { DiceService } from '../dice.service';
import { ChartService } from './../chart.service';
import { ChartComponent } from './../chart/chart.component';
import { CurrentRollComponent } from './../current-roll/current-roll.component';
import { SettingsComponent } from './../settings/settings.component';
import { ThrowSpeed } from './../throw-speed.enum';
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

  it('should randomly throw dice when rollClick from CurrentRollComponent', () => {
    const diceService = fixture.debugElement.injector.get(DiceService);
    const diceSpy = spyOn(diceService, 'randomDiceThrow');
    component.currentRoll.rollClick.next(ThrowSpeed.medium);
    expect(diceSpy).toHaveBeenCalledTimes(1);
  });

  it('should update current roll\'s results when dice service broadcasts new results', () => {
    const diceService = fixture.debugElement.injector.get(DiceService);
    const newResults = [{ value: 1, color: 'ffffff' }, { value: 1, color: '#000000' }];
    diceService.results.next(newResults);
    expect(component.currentRoll.results).toBe(newResults);
  });

  it('should have a renderer dom element', () => {
    const roll = fixture.debugElement;
    expect(roll.query(By.css('canvas#renderer'))).toBeDefined();
  });

  it('should have a stats dom element', () => {
    const roll = fixture.debugElement;
    expect(roll.query(By.css('canvas#renderer > div#stats'))).toBeDefined();
  });
});
