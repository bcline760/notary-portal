import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Alert, AlertSettings } from '../../view-model/alert.model';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts: Alert[] = [];
  alertSub: Subscription | null;
  routeSub: Subscription | null;

  constructor(private router: Router, private alertService: AlertService) {
    this.alertSub = null;
    this.routeSub = null;
  }

  ngOnDestroy(): void {
    if (this.alertSub) {
      this.alertSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.alertSub = this.alertService.onAlert(this.id).subscribe(a => {
      if (!a.message) {
        this.alerts = [];
        return;
      }

      this.alerts.push(a);

      if (a.autoClose) {
        setTimeout(() => this.removeAlert(a), 3000);
      }
    });

    this.routeSub = this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.alertService.clear(this.id);
      }
    });
  }

  removeAlert(alert: Alert) {
    if (!this.alerts.includes(alert)) return;

    if (this.fade) {
      let al: Alert | undefined = this.alerts.find(x => x === alert);
      if (al) {
        al.fade = true;

        setTimeout(() => {
          this.alerts = this.alerts.filter(x => x !== alert);
        }, 250);
      }
    } else {
      this.alerts = this.alerts.filter(x => x !== alert);
    }
  }

  cssClass(alert: Alert) {
    if (!alert) return;

    const classes = ['alert', 'alert-dismissable'];

    const alertTypeClass = {
      [AlertSettings.SUCCESS]: 'alert alert-success',
      [AlertSettings.ERROR]: 'alert alert-danger',
      [AlertSettings.INFO]: 'alert alert-info',
      [AlertSettings.WARNING]: 'alert alert-warning'
    }

    classes.push(alertTypeClass[alert.alertType]);

    if (alert.fade) {
      classes.push('fade');
    }

    return classes.join(' ');
  }
}
