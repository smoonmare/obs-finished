import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription?: Subscription;

  constructor() { }

  ngOnInit(): void {
    // this.firstObsSubscription = interval(1000)
    //   .subscribe(count => {
    //     console.log(count);
    //   }
    // );
    const customIntervalObservable = new Observable(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Beware! Count is greater than 3!'));
        }
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObservable.pipe(
      filter(data => {
        return Number(data) > 0;
      }),
      map(data => {
        return 'Round: ' + (Number(data) + 1);
      })).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message);

    }, () => {
      console.log('Completed!');
    });
  }

  ngOnDestroy(): void {
      this.firstObsSubscription?.unsubscribe();
  }

}
