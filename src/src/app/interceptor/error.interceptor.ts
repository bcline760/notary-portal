import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let handled: boolean = false;

    return next.handle(req).pipe(
      retry(1),
      catchError((re) => {
        let errorMessage: string = '';
        if (re.error instanceof ErrorEvent) {
          errorMessage = `Error: ${re.error.message}`;
        } else if (re instanceof HttpErrorResponse) {
          errorMessage = `Error Status ${re.status}: ${re.error?.error}`;
          handled = this.handleServerSideError(re);
        }

        console.error(errorMessage ? errorMessage : re);
        if (!handled) {
          if (errorMessage) {
            return throwError(() => new Error(errorMessage));
          } else {
            return throwError(() => new Error('An error has occured'));
          }
        } else {
          return of(re);
        }
      })
    );
  }

  private handleServerSideError(error: HttpErrorResponse): boolean {
    let handled: boolean = false;

    switch (error.status) {
      case 401:
        handled = true;
        //this.sessionService.signOut();
        break;
      case 403:
        handled = true;
        //this.sessionService.signOut();
        break;
      case 500:
        handled = true;
        break;
      case 404:
        handled = true;
        break;
    }

    return handled;
  }
}
