import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { DiceService } from './../dice.service';
import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [SettingsComponent],
      providers: [DiceService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should configure stats visibility', () => {
    const diceService = fixture.debugElement.injector.get(DiceService);
    const statsVisibleSpy = spyOnProperty(diceService, 'statsVisible', 'set');
    component.statsShowing = true;
    expect(statsVisibleSpy).toHaveBeenCalledWith(true);
  });

  it('should configure skyBox visibility', () => {
    const diceService = fixture.debugElement.injector.get(DiceService);
    const skyBoxVisibleSpy = spyOnProperty(diceService, 'skyBoxVisible', 'set');
    component.skyBoxShowing = true;
    expect(skyBoxVisibleSpy).toHaveBeenCalledWith(true);
  });

  it('should configure number of dice', () => {
    const diceService = fixture.debugElement.injector.get(DiceService);
    const numberOfDiceSpy = spyOnProperty(diceService, 'numberOfDice', 'set');
    component.numberOfDice = 3;
    expect(numberOfDiceSpy).toHaveBeenCalledWith(3);
  });

});
