import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ThrowSpeed } from '../throw-speed.enum';

@Component({
  selector: 'app-current-roll',
  templateUrl: './current-roll.component.html',
  styleUrls: ['./current-roll.component.scss']
})
export class CurrentRollComponent implements OnInit {

  @Input() results: any;
  @Output() rollClick = new EventEmitter<ThrowSpeed>();

  slow = ThrowSpeed.slow;
  medium = ThrowSpeed.medium;
  hard = ThrowSpeed.hard;

  constructor() { }

  ngOnInit() { }

}
