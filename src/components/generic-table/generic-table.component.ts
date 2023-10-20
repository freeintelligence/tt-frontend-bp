import { Component, Input, OnInit } from '@angular/core';
import { DropdownOption } from '../dropdown/dropdown.component';
import { cloneDeep } from 'src/utils/utils';

export interface TableHeader {
  label: string;
  key?: string;
  type: 'text' | 'imageUrl' | 'dropdown';
  valueTransform?: (value: unknown) => string;
  dropdownOptions?: DropdownOption[];
}

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
})
export class GenericTableComponent implements OnInit {
  public SKELETON_ROWS = new Array(5).fill(undefined);

  @Input() headers: TableHeader[] = [];
  @Input() data?: { [key: string]: unknown }[];
  @Input() perPageOptions: number[] = [];

  public resultsPerPage: number = Number.MAX_SAFE_INTEGER;
  public currentPage!: number;

  ngOnInit(): void {
    this.resultsPerPage = this.perPageOptions.length
      ? this.perPageOptions[0]
      : Number.MAX_SAFE_INTEGER;

    this.setInitialPage();
  }

  setParametersToDropdownOptions(options?: DropdownOption[], parameters?: any) {
    const replyOptions = options?.length ? cloneDeep(options) : [];
    const replyParameters = parameters ? { ...parameters } : {};

    replyOptions.map((e) => (e.parameters = replyParameters));

    return replyOptions;
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
    return this.data?.slice(
      (this.currentPage - 1) * this.resultsPerPage,
      this.currentPage * this.resultsPerPage
    );
  }
}
