import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private activeRequestsCount = 0;
  progressBarStatus = signal<boolean>(false);

  showProgressBar() {
    // Increase active requests count and show the app-loader if it's not already visible
    this.activeRequestsCount++;
    if (!this.progressBarStatus()) {
      this.progressBarStatus.set(true);
    }
  }

  hideProgressBar() {
    // Decrease active requests count and hide the app-loader if no active requests remain
    this.activeRequestsCount--;
    if (this.activeRequestsCount <= 0) {
      this.progressBarStatus.set(false);
      this.activeRequestsCount = 0; // Reset to avoid negative counts
    }
  }
}
