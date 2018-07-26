import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../interfaces';
import { trigger, state, style, animate, transition } from '@angular/animations';

const animation = [
  trigger('alertState', [
    state('show', style({
      opacity: 1
    })),
    state('hide', style({
      opacity: 0
    })),
    transition('show => hide', animate('600ms ease-out')),
    transition('hide => show', animate('1000ms ease-in'))
  ])
];

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  animations: animation
})
export class AlertComponent implements OnInit {
  alertClass: 'success-alert' | 'warn-alert' | 'info-alert' | 'error-alert';
  alert: Alert;
  show = false;
  constructor(private alertService: AlertService) {
    alertService.alert.subscribe((alert) => {
      this.showAlert(alert);
    });
  }

  ngOnInit() {
  }
  showAlert(alert: Alert) {
    this.alert = alert;
    this.addClass();
  }
  get stateName() {
    return this.show ? 'show' : 'hide';
  }

  toggle() {
    this.show = !this.show;
  }

  addClass() {
    switch (this.alert.severity) {
      case 'error':
        this.alertClass = 'error-alert';
        break;
      case 'warning':
        this.alertClass = 'warn-alert';
        break;
      case 'info':
        this.alertClass = 'info-alert';
        break;
      case 'success':
        this.alertClass = 'success-alert';
        break;
    }
  }

}
