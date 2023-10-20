import { Component, Input, OnInit } from '@angular/core';

export interface TableDropdownOption {
  label: string;
  handle?: (item: any) => unknown;
}

export interface TableHeader {
  label: string;
  key?: string;
  type: 'text' | 'imageUrl' | 'dropdown';
  valueTransform?: (value: unknown) => string;
  dropdownOptions?: TableDropdownOption[];
}

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
})
export class GenericTableComponent implements OnInit {
  @Input() headers: TableHeader[] = [];
  @Input() data: { [key: string]: unknown }[] = [];
  @Input() perPageOptions: number[] = [];

  public resultsPerPage: number = Number.MAX_SAFE_INTEGER;
  public currentPage!: number;

  ngOnInit(): void {
    this.resultsPerPage = this.perPageOptions.length
      ? this.perPageOptions[0]
      : Number.MAX_SAFE_INTEGER;

    this.setInitialPage();
  }

  valueTransform(header: TableHeader, value: unknown) {
    if (typeof header.valueTransform !== 'function') {
      return value;
    }

    return header.valueTransform(value);
  }

  setInitialPage() {
    this.currentPage = 1;
  }

  pageChange(page: number) {
    this.currentPage = page;
  }

  getRows() {
    return this.data.slice(
      (this.currentPage - 1) * this.resultsPerPage,
      this.currentPage * this.resultsPerPage
    );
  }
}
