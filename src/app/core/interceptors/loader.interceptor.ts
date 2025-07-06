import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../loader/loader.service';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);

  // Check if the request body has 'showLoader' or if GET request has showLoader=true in params
  let showLoader = (req.body as { showLoader?: boolean })?.showLoader;
  if (!showLoader && req.method === 'GET') {
    showLoader = req.params.get('showLoader') === 'true';
  }

  // check if the request needs to show the hok-loader from the request options
  if (showLoader) {
    loaderService.showProgressBar();
  }

  return next(req).pipe(
    // Always hide the hok-loader after the request completes, whether success or error
    finalize(() => {
      if (showLoader) {
        loaderService.hideProgressBar();
      }
    }),
  );
};
