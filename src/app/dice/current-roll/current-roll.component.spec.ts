import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentRollComponent } from './current-roll.component';

describe('CurrentRollComponent', () => {
  let component: CurrentRollComponent;
  let fixture: ComponentFixture<CurrentRollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentRollComponent ]
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
});
