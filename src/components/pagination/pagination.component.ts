import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() currentPage!: number;
  @Input() totalDataCount!: number;
  @Input() perPageDataCount!: number;

  @Output() pageChange = new EventEmitter<number>();

  totalPages() {
    return Math.ceil(this.totalDataCount / this.perPageDataCount);
  }

  pageOptions() {
    const options = [];

    if (this.currentPage > 1) {
      options.push(this.currentPage - 1);
    }

    options.push(this.currentPage);

    if (this.currentPage < this.totalPages()) {
      options.push(this.currentPage + 1);
    }

    return options;
  }

  changePage(page: number) {
    this.currentPage = page;
    this.pageChange.emit(page);
  }

  prev() {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }

  next() {
    if (this.currentPage < this.totalPages()) {
      this.changePage(this.currentPage + 1);
    }
  }
}
