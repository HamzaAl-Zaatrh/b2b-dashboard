# B2bDashboard

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## Live Demo

You can see the live application running at:
[https://b2b-dashboard-sooty.vercel.app/](https://b2b-dashboard-sooty.vercel.app/)

The project has been deployed to Vercel for demonstration purposes.

## Screenshots

<div align="center">
  <table>
    <tr>
      <td align="center"><b>Dashboard</b></td>
      <td align="center"><b>Orders Management</b></td>
    </tr>
    <tr>
      <td><img src="/public/img/screenshots/dashboard.png" width="380"/></td>
      <td><img src="/public/img/screenshots/orders.png" width="380"/></td>
    </tr>
    <tr>
      <td align="center"><b>Product Catalog</b></td>
      <td align="center"><b>Customer Management</b></td>
    </tr>
    <tr>
      <td><img src="/public/img/screenshots/products.png" width="380"/></td>
      <td><img src="/public/img/screenshots/customers.png" width="380"/></td>
    </tr>
    <tr>
      <td align="center"><b>Dark Mode</b></td>
      <td align="center"><b>Mobile Responsive</b></td>
    </tr>
    <tr>
      <td><img src="/public/img/screenshots/dark-mode.png" width="380"/></td>
      <td><img src="/public/img/screenshots/mobile-responsive.png" width="380"/></td>
    </tr>
  </table>
</div>

## Project Structure

The project follows a modular architecture with clear separation of concerns:

```
b2b-dashboard/
├── src/
│   ├── app/
│   │   ├── core/              # Core functionality used across the app
│   │   │   ├── base/          # Base classes and abstractions
│   │   │   ├── guards/        # Route guards for authentication
│   │   │   ├── interceptors/  # HTTP interceptors
│   │   │   ├── loader/        # Loading indicators
│   │   │   ├── paginator/     # Custom pagination
│   │   │   └── services/      # Shared services
│   │   │
│   │   ├── features/          # Feature modules
���   │   │   ├── auth/          # Authentication feature
│   │   │   └── main/          # Main application features
│   │   │       ├── customers/ # Customer management
│   │   │       ├── home/      # Dashboard home
│   │   │       ├── orders/    # Order management
│   │   │       └── products/  # Product management
│   │   │
│   │   ├── layouts/           # Page layouts and containers
│   │   │
│   │   └── ui/                # Reusable UI components
│   │       ├── app-grid/      # Data grid component
│   │       ├── filter-bar/    # Filtering component
│   │       └── section-header/ # Page header component
│   │
│   ├── environments/          # Environment configuration
│   └── styles/                # Global styles and themes
│
├── public/                    # Static assets
│   ├── i18n/                  # Translation files
│   ├── fonts/                 # Custom fonts
│   ├── img/                   # Image assets
│   └── svg/                   # SVG assets
│
└── angular.json              # Angular CLI configuration
```

## Key Features

### 1. Scalable Project Architecture

The project follows a modular architecture with clear separation of concerns, making it highly scalable and maintainable:
- Feature-based organization for domain-specific code
- Core module for application-wide services and utilities
- Reusable UI components isolated from business logic
- Shared services for cross-cutting concerns

### 2. Environment Management

Multiple environment configurations are provided to support different deployment scenarios:
- Development environment for local development
- Production environment for deployment
- Environment-specific API endpoints and configuration settings

### 3. TypeScript Path Aliases

Custom TypeScript path configuration has been implemented for cleaner imports:
- No more complex relative paths (../../)
- Logical module-based imports (e.g., `@core/services/auth.service`)
- Enhanced code readability and maintenance

### 4. Code Quality Tools

Prettier integration ensures consistent code formatting across the project:
- Automated code formatting
- Enforced code style guidelines
- Improved collaboration with standardized formatting

### 5. Theming Support

The application includes a comprehensive theming system:
- Light and dark mode support
- Material Design color palettes
- Theme switching with persistent user preference
- Customizable color variables

### 6. Internationalization

Full multi-language support implemented with ngx-translate:
- Language switching without page reload
- Translation files organized by language
- Support for right-to-left (RTL) languages
- Dynamic content translation

### 7. Responsive Design

The application is fully responsive and works on all device sizes:
- Mobile-first design approach
- Responsive grid layouts
- Adaptive navigation components
- Device-specific optimizations

### 8. Performance Optimization

Performance is optimized through multiple techniques:
- Lazy-loaded feature modules
- Code splitting for faster initial load
- Efficient state management

### 9. Reusable Component Library

A comprehensive set of reusable components designed for maximum flexibility:
- Filter Bar for advanced data filtering
- Data Grid for tabular data display
- Section Headers for consistent page layout

### 10. Dynamic Page Title Management

The application implements a custom Title Service that dynamically updates the browser tab title:
- Centralized title management for consistency across the application

## API Integration

For the products and customers features, the application integrates with the Platzi Fake Store API:
- API Endpoint: https://fakeapi.platzi.com/en

Note: While the API provides real data for the application, all filtering functionality is implemented client-side for demonstration purposes. In a production environment, these filters would typically be implemented as API parameters for better performance with large datasets.

## Requirements

To run this project, you need:

- **Node.js**: version 18.x or higher
- **npm**: version 9.x or higher
- **Angular CLI**: version 19.x

## Development server

To start a local development server, run:

```bash
ng serve
```

or

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.


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
