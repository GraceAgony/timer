import {Injectable, EventEmitter, Output} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import { timer } from 'rxjs';

@Injectable()
export class TimerService {
      minutes: number;
     seconds: number;
     hours: number;
     time = 0;
     startTime = 0;
     subscribe: Subscription;
     stop = false;
     waitInterval = 0;
     @Output() onChanged = new EventEmitter<{hours: number, minutes: number, seconds: number}>();

     public start() {
       this.startTime = + this.time;
       if (this.subscribe) {
         this.subscribe.unsubscribe();
       }
       if (!this.stop) {
         const timerVar = timer(1, 1000);
         this.subscribe = timerVar.subscribe(t => {
           this.time = t + this.startTime;
           this.seconds = this.getSeconds(this.time);
           this.minutes = this.getMinutes(this.time);
           this.hours = this.getHours(this.time);
           this.onChanged.emit({hours: this.hours, minutes: this.minutes,
                                seconds: this.seconds});
         });
       }
       this.stop = !this.stop;
     }

     public wait() {
       let sub: Subscription;
       if (this.waitInterval !== 0) {
         if (this.waitInterval <= 300) {
           this.pause();
         }
         this.waitInterval = 0;
       } else {
         let waitVar = timer(1, 1);
         sub = waitVar.subscribe(t => {
           this.waitInterval++;
         });
       }
     }

     public pause() {
       this.startTime = + this.time;
       if (this.subscribe) {
         this.subscribe.unsubscribe();
       }
       this.stop = false;
     }

     private reset() {
       this.startTime = 0;
       this.time = 0;

       this.seconds = 0;
       this.minutes = 0;
       this.hours = 0;
       if (this.subscribe) {
         this.subscribe.unsubscribe();
       }
       this.stop = false;
       this.onChanged.emit({hours: this.hours, minutes: this.minutes,
         seconds: this.seconds});s
     }

     private getSeconds(time: number) {
       return this.clearDisplay(time % 60);
     }

     private getMinutes(time: number) {
       return this.clearDisplay(Math.floor(time / 60 % 60));
     }

     private getHours(time: number) {
       return this.clearDisplay(Math.floor(time / 3600));
     }

     private clearDisplay(t: any) {
       return t <= 9 ? '0' + t : t;
     }
}
