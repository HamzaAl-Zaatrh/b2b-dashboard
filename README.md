# B2bDashboard

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Reusable Components

### Filter Bar Component

The Filter Bar component is a reusable UI element designed to provide flexible and powerful filtering capabilities across the application.

#### Features

- **Multiple Filter Types**:
  - Text fields for string searches
  - Dropdowns for selecting from predefined options
  - Date ranges with start/end date pickers
  - Range sliders with min/max values and tooltips

- **Expandable/Collapsible Interface**:
  - Toggle visibility with a single click
  - Includes a divider to separate filter section from content

- **Responsive Design**:
  - Adapts to different screen sizes
  - Filter fields wrap based on available space

- **Interactive Controls**:
  - Real-time filtering as values change
  - Reset button to clear all filters
  - Search button to apply filters

#### Where It's Used

- **Orders Screen**:
  - Filter orders by customer name/email/phone
  - Filter by order status (dropdown)
  - Filter by date range

- **Products Screen**:
  - Filter products by name
  - Filter by price range (slider)
  - Filter by availability status

#### How to Use

To implement the filter bar in a component:

1. **Import the Component**:
   ```typescript
   import { FilterBarComponent, FilterConfig } from '@ui/filter-bar/filter-bar.component';

   @Component({
     // ...
     imports: [FilterBarComponent],
     // ...
   })
   ```

2. **Define Filter Configuration**:
   ```typescript
   filterConfigs: FilterConfig[] = [
     {
       key: 'name',
       label: 'Name',
       type: 'text',
       defaultValue: ''
     },
     {
       key: 'status',
       label: 'Status',
       type: 'dropdown',
       options: [
         { id: 1, name: 'Active' },
         { id: 2, name: 'Inactive' }
       ]
     },
     {
       key: 'dateRange',
       label: 'Date Range',
       type: 'date-range'
     },
     {
       key: 'price',
       label: 'Price Range',
       type: 'range-slider',
       min: 0,
       max: 1000
     }
   ];
   ```

3. **Add to Template**:
   ```html
   <app-filter-bar
     [filterConfigs]="filterConfigs"
     (search)="onFilterSearch($event)"
   ></app-filter-bar>
   ```

4. **Handle Filter Events**:
   ```typescript
   onFilterSearch(filterValues: Record<string, any>): void {
     // Process filter values and apply filtering logic
     this.filterValues = filterValues;
     this.applyFilters();
   }
   ```

For range sliders, tooltips will automatically display the current value. For date ranges, two date pickers are provided for start and end dates.

### App Grid Component

The App Grid component is a powerful, feature-rich data table solution for displaying and interacting with tabular data throughout the application.

#### Features

- **Flexible Column Configuration**:
  - Support for multiple data types: string, number, date, flag, boolean, image, object
  - Custom column formatting with suffixes and conditional display options
  - Ellipsis support for long text
  - Clickable cells with custom actions

- **Sorting and Filtering**:
  - Column-level sorting capabilities
  - Built-in search functionality with debounce
  - Filterable columns

- **Pagination**:
  - Customizable page sizes
  - First/last page navigation
  - Page size selector

- **Row Selection**:
  - Single or multiple row selection
  - Selection-aware actions

- **Action Handling**:
  - Row-level actions with icon buttons
  - Conditional action visibility
  - Custom tooltips
  - Theme color support
  - Header actions for selected rows

- **Responsive Design**:
  - Adapts to different screen sizes
  - Scrollable for large datasets


#### How to Use

To implement the app-grid in a component:

1. **Import the Component**:
   ```typescript
   import { 
     AppGridComponent, 
     ColumnConfig, 
     ActionConfig, 
     PaginationInfo 
   } from '@ui/app-grid/app-grid.component';

   @Component({
     // ...
     imports: [AppGridComponent],
     // ...
   })
   ```

2. **Define Column Configuration**:
   ```typescript
   columnsConfig: ColumnConfig[] = [
     {
       key: 'id',
       label: 'ID',
       type: 'number',
       sortable: true
     },
     {
       key: 'name',
       label: 'Name',
       type: 'string',
       filterable: true,
       sortable: true
     },
     {
       key: 'status',
       label: 'Status',
       type: 'flag',
       flagCondition: (row) => row.status.color
     },
     {
       key: 'price',
       label: 'Price',
       type: 'number',
       suffix: ' JD',
       sortable: true
     },
     {
       key: 'date',
       label: 'Date',
       type: 'date',
       sortable: true
     }
   ];
   ```

3. **Define Actions**:
   ```typescript
   actions: ActionConfig[] = [
     {
       icon: 'visibility',
       clickFn: (row) => this.viewItem(row),
       tooltip: 'View Details',
       themeClass: 'primary'
     },
     {
       icon: 'edit',
       clickFn: (row) => this.editItem(row),
       tooltip: 'Edit',
       condition: (row) => row.status !== 'locked'
     },
     {
       icon: 'delete',
       clickFn: (row) => this.deleteItem(row),
       tooltip: 'Delete',
       themeClass: 'warn',
       condition: (row) => this.canDelete(row)
     }
   ];
   ```

4. **Add to Template**:
   ```html
   <app-grid
     [dataSource]="items"
     [totalCount]="totalCount"
     [columnsConfig]="columnsConfig"
     [actions]="actions"
     [enableSelection]="true"
     [searchEnabled]="true"
     (paginationChanged)="onPaginationChange($event)"
   ></app-grid>
   ```

5. **Handle Pagination Events**:
   ```typescript
   onPaginationChange(event: PaginationInfo): void {
     // Handle pagination changes, e.g., fetch data for the new page
     this.fetchData(event.page, event.pageSize);
   }
   ```

The grid component automatically handles UI concerns like displaying loaders during data fetching, formatting dates and numbers appropriately, and implementing row selection functionality.

### Section Header Component

The Section Header component provides a consistent and reusable page header across the application, combining title display with optional action buttons.

#### Features

- **Title Display**:
  - Configurable main title with translation support
  - Optional icon preceding the title
  - Supports both regular and sub-header styling

- **Action Button Integration**:
  - Optional action button with customizable text
  - Optional icon for the action button
  - Click event output for handling user interactions

- **Responsive Design**:
  - Clean layout that adapts to different screen sizes
  - Consistent spacing and alignment

- **Seamless Translation Support**:
  - Built-in integration with translation pipes
  - All text elements can be internationalized

#### Where It's Used

- **Orders Screen**: Page title with add order button
- **Products Screen**: Page title with add product button
- **Customers Screen**: Page title with add customer button
- 
#### How to Use

To implement the section header in a component:

1. **Import the Component**:
   ```typescript
   import { SectionHeaderComponent } from '@ui/section-header/section-header.component';

   @Component({
     // ...
     imports: [SectionHeaderComponent],
     // ...
   })
   ```

2. **Add to Template**:
   ```html
   <section-header
     title="page.title.key"
     titleIcon="dashboard"
     actionName="actions.add"
     actionIcon="add"
     (onActionClicked)="handleAction()"
   ></section-header>
   ```

3. **Handle Action Events**:
   ```typescript
   handleAction(): void {
     // Handle button click, e.g., open a dialog or navigate
     this.dialog.open(AddItemComponent);
   }
   ```

4. **Use as Sub-Header**:
   ```html
   <section-header
     title="section.title.key"
     [isSubHeader]="true"
   ></section-header>
   ```

The component automatically handles translation of title and action name text through the TranslatePipe, ensuring consistent internationalization throughout your application.
