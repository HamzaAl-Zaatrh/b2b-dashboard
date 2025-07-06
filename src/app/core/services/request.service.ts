import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  apiUrlPrefix = environment.apiUrl;
  private _http = inject(HttpClient);

  private getFullUrl(url: string): string {
    return `${this.apiUrlPrefix}${url}`;
  }

  get<T>(
    url: string,
    params?: Record<string, any> | null,
    showLoader: boolean = false,
  ): Observable<T> {
    const fullUrl = this.getFullUrl(url);

    const finalParams = {
      ...params,
      showLoader: showLoader.toString(),
    };

    return this._http.get<T>(fullUrl, { params: finalParams });
  }
}
