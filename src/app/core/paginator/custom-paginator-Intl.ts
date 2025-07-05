import { Injectable, OnDestroy } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

export type PaginationInfo = {
  page: number;
  pageSize: number;
  total: number;
};

@Injectable({
  providedIn: 'root',
})
export class CustomPaginatorIntl implements MatPaginatorIntl, OnDestroy {
  changes = new Subject<void>();

  firstPageLabel: string = '';
  itemsPerPageLabel: string = '';
  lastPageLabel: string = '';
  nextPageLabel: string = '';
  previousPageLabel: string = '';

  constructor(private translate: TranslateService) {
    this.translateLabels();
    this.changes.next();
  }

  translateLabels() {
    const keys = [
      'PAGINATOR.FIRST_PAGE',
      'PAGINATOR.ITEMS_PER_PAGE',
      'PAGINATOR.LAST_PAGE',
      'PAGINATOR.NEXT_PAGE',
      'PAGINATOR.PREVIOUS_PAGE',
    ];

    // Use instant() because the translation file is already loaded or translations have been manually set
    this.firstPageLabel = this.translate.instant(keys[0]) || 'First Page';
    this.itemsPerPageLabel = this.translate.instant(keys[1]) || 'Items per page';
    this.lastPageLabel = this.translate.instant(keys[2]) || 'Last Page';
    this.nextPageLabel = this.translate.instant(keys[3]) || 'Next Page';
    this.previousPageLabel = this.translate.instant(keys[4]) || 'Previous Page';
  }

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length == 0 || pageSize == 0) {
      return this.translate.instant('PAGINATOR.PAGE_1_OF_1');
    }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

    const totalPages = Math.ceil(length / pageSize);

    return this.translate.instant('PAGINATOR.RANGE_LABEL', {
      startIndex: startIndex + 1,
      endIndex,
      length,
      totalPages,
    });
  }

  ngOnDestroy(): void {
    this.changes.complete();
  }
}
