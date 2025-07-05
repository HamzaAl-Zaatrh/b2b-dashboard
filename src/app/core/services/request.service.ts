import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '@env/environment';
// import { HokConfirmModalComponent } from '@ui/modals/hok-confirm-modal/hok-confirm-modal.component';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
// import { HokGridComponent } from '@ui/hok-grid/hok-grid.component';

export type PaginationType = {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  itemsPerPage: number;
};

export type ApiResponse<T> = {
  status: string;
  data: {
    returnValue: T;
    pagination?: PaginationType;
  };
  message?: string;
  code?: number;
  status_code?: string;
};

@Injectable({
  providedIn: 'root',
})
export class RequestService implements OnDestroy {
  apiUrlPrefix = environment.apiUrl;
  private dialog = inject(MatDialog);
  private _http = inject(HttpClient);
  private destroy$ = new Subject<void>();

  private getFullUrl(url: string): string {
    return `${this.apiUrlPrefix}${url}`;
  }

  post<T1, T2 = object>(
    url: string,
    body?: T2 | null,
    showLoader: boolean = false,
  ): Observable<ApiResponse<T1>> {
    const fullUrl: string = this.getFullUrl(url);

    // Add the WebApiVersion and Language to the body
    const finalBody = {
      ...body,
      showLoader: showLoader, // for the interceptor
    };

    return this._http.post<ApiResponse<T1>>(fullUrl, finalBody);
  }

  postFormData<T1>(url: string, formData: FormData): Observable<ApiResponse<T1>> {
    const fullUrl: string = this.getFullUrl(url);

    return this._http.post<ApiResponse<T1>>(fullUrl, formData);
  }

  get<T>(
    url: string,
    params?: Record<string, any> | null,
    showLoader: boolean = false,
  ): Observable<ApiResponse<T>> {
    const fullUrl = this.getFullUrl(url);

    const finalParams = {
      ...params,
      showLoader: showLoader.toString(),
    };

    return this._http.get<ApiResponse<T>>(fullUrl, { params: finalParams });
  }

  getFile(url: string, params?: Record<string, any> | null): Observable<Blob> {
    const fullUrl = this.getFullUrl(url);

    const finalParams = {
      ...params,
      showLoader: true,
    };

    return this._http.get(fullUrl, {
      params: finalParams,
      responseType: 'blob',
    });
  }

  postFile<T1>(url: string, body: T1, params?: Record<string, any> | null): Observable<Blob> {
    const fullUrl = this.getFullUrl(url);

    const finalParams = {
      ...params,
      showLoader: true,
    };

    return this._http.post(fullUrl, body, { responseType: 'blob', params: finalParams });
  }

  delete(url: string): Observable<ApiResponse<undefined>> {
    const fullUrl = this.getFullUrl(url);
    return this._http.delete<ApiResponse<undefined>>(fullUrl);
  }

  put<T1, T2 = object>(
    url: string,
    body?: T2 | null,
    showLoader: boolean = false,
  ): Observable<ApiResponse<T1>> {
    const fullUrl: string = this.getFullUrl(url);

    // Add the WebApiVersion and Language to the body
    const finalBody = {
      ...body,
      showLoader: showLoader,
    };
    return this._http.put<ApiResponse<T1>>(fullUrl, finalBody);
  }

  putFormData<T1>(url: string, formData: FormData): Observable<ApiResponse<T1>> {
    const fullUrl: string = this.getFullUrl(url);
    return this._http.put<ApiResponse<T1>>(fullUrl, formData);
  }

  // utility methods -------------------------------

  /**
   * Opens a confirmation dialog before deleting a resource.
   * @param ak - The unique identifier for the resource.
   * @param resource - The name of the resource to be deleted.
   * @param message - The message to display in the confirmation dialog, can be a translation key.
   * @returns An Observable that emits true if the user confirms deletion, false otherwise.
   */
  // deleteWithConfirmation(
  //   ak: string,
  //   resource: string,
  //   message: string = 'main.deleteConfirmationMessage',
  // ): Observable<boolean> {
  //   return this.dialog
  //     .open(HokConfirmModalComponent, {
  //       data: {
  //         confirmMessage: this.translate.instant(message),
  //         type: 'delete',
  //         resourceName: resource,
  //         ak: ak,
  //       },
  //       minWidth: '50vw',
  //     })
  //     .afterClosed()
  //     .pipe(takeUntil(this.destroy$));
  // }

  // openAddEditDialog<T1, T2>(component: any, data: T1, gridRef?: HokGridComponent<T2>): void {
  //   const dialogRef = this.dialog.open(component, {
  //     data: data,
  //   });
  //
  //   // subscribe to the dialog result
  //   dialogRef
  //     .afterClosed()
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe((result) => {
  //       if (result && gridRef) {
  //         gridRef.refreshGrid();
  //       }
  //     });
  // }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
