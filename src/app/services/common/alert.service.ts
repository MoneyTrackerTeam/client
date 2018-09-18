import { Injectable, EventEmitter } from '@angular/core';
import { Alert } from '../../interfaces';



@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alert: EventEmitter<Alert>;
  constructor() {
    this.alert = new EventEmitter();
  }

  showAlert(alert: Alert) {
    this.alert.emit(alert);
  }
}
