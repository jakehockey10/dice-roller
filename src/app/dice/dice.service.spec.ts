import { inject, TestBed } from '@angular/core/testing';

import { DiceService } from './dice.service';
import { ThrowSpeed } from './throw-speed.enum';

describe('DiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiceService]
    });
  });

  it('should be created', inject([DiceService], (service: DiceService) => {
    expect(service).toBeTruthy();
  }));

  it('should have a rendererDOMElement', inject([DiceService], (service: DiceService) => {
    expect(service.rendererDOMElement).toBeDefined();
  }));

  it('should have a statsDOMElement', inject([DiceService], (service: DiceService) => {
    expect(service.statsDOMElement).toBeDefined();
  }));

  it('should get results with randomDiceThrow', (done: DoneFn) => {
    const service = new DiceService();
    service.numberOfDice = 2;
    service.randomDiceThrow(ThrowSpeed.medium);
    requestAnimationFrame(() => animate(service));
    service.results.subscribe(results => {
      expect(results).toBeDefined();
      done();
    });
  });

  function animate(service: DiceService) {
    service.updatePhysics();
    service.render();
    service.update();
    requestAnimationFrame(() => animate(service));
  }

  it('should be able to decrease the number of dice without throwing error', inject([DiceService], (service: DiceService) => {
    expect(() => {
      service.numberOfDice = 6;
      service.numberOfDice = 4;
    }).not.toThrowError();
  }));

});
