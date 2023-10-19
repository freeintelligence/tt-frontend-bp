import { Component, Input, OnInit } from '@angular/core';

export interface TableHeader {
  label: string;
  key: string;
  type: 'text' | 'imageUrl';
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
