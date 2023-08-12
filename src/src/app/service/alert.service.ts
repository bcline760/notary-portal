import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Alert, AlertSettings } from '../view-model/alert.model';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private subject = new BehaviorSubject<Alert>(new Alert());
  private default = 'default-alert';

  onAlert(id = this.default): Observable<Alert> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
  }

  success(message: string, options?: any) {
    this.alert(new Alert({ ...options, alertType: AlertSettings.SUCCESS, message }));
  }

  error(message: string, options?: any) {
    this.alert(new Alert({ ...options, alertType: AlertSettings.ERROR, message }));
  }

  info(message: string, options?: any) {
    this.alert(new Alert({ ...options, alertType: AlertSettings.INFO, message }));
  }

  warn(message: string, options?: any) {
    this.alert(new Alert({ ...options, alertType: AlertSettings.WARNING, message }));
  }

  alert(alert: Alert) {
    alert.id = alert.id || this.default;

    this.subject.next(alert);
  }

  clear(id = this.default) {
    this.subject.next(new Alert({ id }));
  }
}
