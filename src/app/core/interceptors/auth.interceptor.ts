import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@app/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken: string | null = inject(AuthService).getAuthToken();

  if (!authToken) {
    return next(req);
  }

  // Clone the request to add the authentication header.
  const newReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${authToken}`),
  });
  return next(newReq);
};
