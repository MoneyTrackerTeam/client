import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderState } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();
  constructor() { }
  shown() {
    this.loaderSubject.next(<LoaderState>{ shown: true });
  }
  hide() {
    this.loaderSubject.next(<LoaderState>{ shown: false });
  }
}
