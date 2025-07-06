import { Component, computed, input, OnDestroy, OnInit, output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { DatePipe, DecimalPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatMenuModule } from '@angular/material/menu';
import { AppLoaderComponent } from '@core/loader/app-loader/app-loader.component';

export type PaginationInfo = {
  page: number;
  pageSize: number;
};

export type ColumnType = 'string' | 'number' | 'date' | 'flag' | 'boolean' | 'image' | 'obj';
export type FlagColor = 'primary' | 'green' | 'red' | 'yellow';
export type ThemeColor = 'primary' | 'warn';

export interface ColumnConfig<T = any> {
  key: keyof T & string;
  subKey?: string;
  label: string;
  type: ColumnType;
  flagCondition?: (row: T) => FlagColor; // if type is 'flag'
  suffix?: string; // it applies for 'number' type
  sortable?: boolean;
  filterable?: boolean;
  clickable?: boolean;
  clickFn?: (row: T) => void;
  ellipsis?: boolean;
  trueLabel?: string; // if type is 'boolean'
  falseLabel?: string; // if type is 'boolean'
}

export interface HeaderActionConfig<T = any> {
  labelKey: string; // Translation key
  actionFunction: (rows: T[]) => void;
  activeCondition?: 'single' | 'multiple';
  icon?: string;
}

export interface ActionConfig<T = any> {
  icon: string;
  clickFn: (row: T) => void;
  themeClass?: ThemeColor;
  tooltip?: string;
  condition?: (row: T) => boolean;
}

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
    MatIconButton,
    MatTooltip,
    DatePipe,
    DecimalPipe,
    MatButton,
    TranslatePipe,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatMenuModule,
    AppLoaderComponent,
  ],
  templateUrl: './app-grid.component.html',
  styleUrl: './app-grid.component.scss',
})
export class AppGridComponent<T> implements OnInit, OnDestroy {
  // Inputs
  dataSource = input.required<T[]>();
  totalCount = input<number>(0);
  isLoading = input(false);
  columnsConfig = input.required<ColumnConfig<T>[]>();
  actions = input<ActionConfig<T>[]>([]);
  pageSizeOptions = input([5, 10, 25, 100]);
  searchEnabled = input<boolean>(true);
  headerActions = input<HeaderActionConfig<T>[]>([]);
  searchDebounceTime = input<number>(300);
  enableFilter = input<boolean>(false);
  importOnlyAdmin = input<boolean>(false);
  columnsForFileTransfer = input<ColumnConfig<T>[]>([]);
  enableSelection = input<boolean>(false);
  selection = new SelectionModel<T>(true, []);

  // Outputs
  readonly paginationChanged = output<PaginationInfo>();
  searchChanged = output<string>();

  // Computed properties
  readonly displayedColumns = computed<string[]>(() => {
    const columns = this.columnsConfig().map((c) => c.key);
    let displayColumns: string[] = [...columns];

    // Add select column if selection is enabled
    if (this.enableSelection()) {
      displayColumns = ['select', ...displayColumns];
    }

    // Add actions column if actions are present
    if (this.actions().length > 0) {
      displayColumns = [...displayColumns, 'actions'];
    }

    return displayColumns;
  });

  // Search control
  searchControl = new FormControl('');
  private destroy$ = new Subject<void>();

  // Pagination info
  paginationInfo: PaginationInfo = {
    page: 0,
    pageSize: 5,
  };

  ngOnInit() {
    this.setupSearch();
  }

  private setupSearch(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(this.searchDebounceTime()),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
      )
      .subscribe((value) => {
        this.searchChanged.emit(value?.trim() ?? '');
      });
  }

  protected onPaginationChange(event: PageEvent): void {
    this.paginationInfo = {
      page: event.pageIndex,
      pageSize: event.pageSize,
    };
    this.paginationChanged.emit(this.paginationInfo);
  }

  /** Handles the header action click event */
  protected onHeaderActionClick(action: HeaderActionConfig<T>): void {
    action.actionFunction(this.selection.selected);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource().length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource());
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: T): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${this.dataSource().indexOf(row) + 1}`;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
