import { inject, Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { TitleService } from '@core/services/title.service';

/**
 * BaseComponent provides common functionality for Angular components,
 * including service injection, loading state management, and subscription cleanup.
 *
 * @description
 * - Injects commonly used services: TitleService, Router.
 * - Exposes a destroy$ Subject for managing unsubscriptions in derived components.
 * - Provides a common isLoading flag for UI state.
 * - Implements ngOnDestroy to clean up subscriptions.
 *
 * @note
 * The @Injectable() decorator is used to allow Angular's dependency injection system
 * to inject services into this abstract base class. This is necessary because
 * the `inject()` function requires the class to be injectable, even if the class
 * itself is not provided directly in a module or component.
 */
@Injectable()
export abstract class BaseComponent implements OnDestroy {
  /**
   * Injected TitleService for managing document titles.
   */
  protected titleService = inject(TitleService);

  /**
   * Injected Router for navigation.
   */
  protected router = inject(Router);

  /**
   * Subject used to notify and clean up subscriptions on component destruction.
   */
  protected destroy$ = new Subject<void>();

  /**
   * Common loading flag for UI state management.
   */
  isLoading = false;

  paginationInfo = {
    page: 0,
    pageSize: 5,
  };

  /**
   * Angular lifecycle hook for cleaning up subscriptions.
   * Emits and completes the destroy$ Subject.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
