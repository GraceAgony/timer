import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {TimerService} from '../../services/timer.service';


@Component({
  selector: 'timer',
  templateUrl: 'timer.component.html',
  styleUrls: ['timer.component.css'],
  providers: [TimerService]
})
export class TimerComponent implements OnInit{

  constructor(private timerService: TimerService){};
  minutes: number;
  seconds: number;
  hours: number;
  subscribe: Subscription;
  ngOnInit(){
    this.subscribe = this.timerService.onChanged.subscribe(t => {
      this.seconds = t.seconds;
      this.minutes = t.minutes;
      this.hours = t.hours;
    });
  }

}
