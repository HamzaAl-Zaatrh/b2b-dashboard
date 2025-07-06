import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorHandleInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';
      const isClientError = typeof ErrorEvent !== 'undefined' && error.error instanceof ErrorEvent;

      if (isClientError || error.status === 0) {
        // client-side error
        errorMessage = 'toastMessages.error';
      } else {
        // server-side error
        errorMessage = error.error.message;
      }

      // toastService.showError(errorMessage || 'toastMessages.error');
      return throwError(() => errorMessage);
    }),
  );
};
