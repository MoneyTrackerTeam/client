import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../interfaces';
import { trigger, state, style, animate, transition } from '@angular/animations';

const animation = [
  trigger('alertState', [
    state('show', style({
      right: '15px',
    })),
    state('hide', style({
      opacity: 0,
      display: 'none'
    })),
    transition('show => hide', animate('400ms ease-in-out')),
    transition('hide => show', animate('600ms ease-in-out'))
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
  alert: Alert = {
    severity: 'info',
    text: ''
  };
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
    this.show = true;
    setTimeout(() => {
      this.show = false;
    }, 2500);
  }
  get stateName() {
    return this.show ? 'show' : 'hide';
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
