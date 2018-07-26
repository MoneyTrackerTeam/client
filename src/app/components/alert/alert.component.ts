import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../interfaces';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  alertClass: 'success-alert' | 'warn-alert' | 'info-alert' | 'error-alert';
  alert: Alert;
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