import { Component, OnInit, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';

export interface FilterConfig {
  key: string;
  label: string;
  type: 'text' | 'dropdown' | 'date-range' | 'range-slider';
  options?: { name: string; id: any }[]; // For dropdown
  min?: number; // For range slider
  max?: number; // For range slider
  defaultValue?: any;
}

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss',
})
export class FilterBarComponent implements OnInit {
  fb = inject(FormBuilder);
  filterConfigs = input<FilterConfig[]>([]);
  search = output<Record<string, any>>();

  filterForm: FormGroup;
  expanded = true;

  constructor() {
    this.filterForm = this.fb.group({});
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.filterConfigs().forEach((config) => {
      if (config.type === 'date-range') {
        this.filterForm.addControl(
          config.key + '_start',
          this.fb.control(config.defaultValue?.start || null),
        );
        this.filterForm.addControl(
          config.key + '_end',
          this.fb.control(config.defaultValue?.end || null),
        );
      } else if (config.type === 'range-slider') {
        this.filterForm.addControl(
          config.key + '_min',
          this.fb.control(config.defaultValue?.min || config.min),
        );
        this.filterForm.addControl(
          config.key + '_max',
          this.fb.control(config.defaultValue?.max || config.max),
        );
      } else {
        this.filterForm.addControl(config.key, this.fb.control(config.defaultValue || ''));
      }
    });
  }

  onSearch() {
    this.search.emit(this.filterForm.value);
  }

  onReset() {
    this.filterForm.reset();
    this.filterConfigs().forEach((config) => {
      if (config.type === 'range-slider') {
        this.filterForm.get(config.key + '_min')?.setValue(config.min);
        this.filterForm.get(config.key + '_max')?.setValue(config.max);
      }
    });
    this.search.emit(this.filterForm.value);
  }

  formatLabel(value: number): string {
    return value.toString();
  }
}
