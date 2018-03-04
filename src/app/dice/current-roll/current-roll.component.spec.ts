import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { click } from '../../../testing';
import { ThrowSpeed } from '../throw-speed.enum';
import { CurrentRollComponent } from './current-roll.component';

describe('CurrentRollComponent', () => {
  let component: CurrentRollComponent;
  let fixture: ComponentFixture<CurrentRollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentRollComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentRollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should raise rollClick event with hard throw speed when hard roll button clicked', () => {
    let throwSpeedClicked;
    component.rollClick.subscribe(throwSpeed => throwSpeedClicked = throwSpeed);
    click(fixture.debugElement.query(By.css('#hardBtn')));
    expect(throwSpeedClicked).toBe(ThrowSpeed.hard);
  });

  it('should raise rollClick event with medium throw speed when medium roll button clicked', () => {
    let throwSpeedClicked;
    component.rollClick.subscribe(throwSpeed => throwSpeedClicked = throwSpeed);
    click(fixture.debugElement.query(By.css('#mediumBtn')));
    expect(throwSpeedClicked).toBe(ThrowSpeed.medium);
  });

  it('should raise rollClick event with slow throw speed when slow roll button clicked', () => {
    let throwSpeedClicked;
    component.rollClick.subscribe(throwSpeed => throwSpeedClicked = throwSpeed);
    click(fixture.debugElement.query(By.css('#slowBtn')));
    expect(throwSpeedClicked).toBe(ThrowSpeed.slow);
  });

});
