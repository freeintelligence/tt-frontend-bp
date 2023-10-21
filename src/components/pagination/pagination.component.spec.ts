import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent],
    });
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate the total number of pages correctly', () => {
    component.totalDataCount = 50;
    component.perPageDataCount = 10;
    expect(component.totalPages()).toBe(5);

    component.totalDataCount = 0;
    component.perPageDataCount = 10;
    expect(component.totalPages()).toBe(0);

    component.totalDataCount = 100;
    component.perPageDataCount = 7;
    expect(component.totalPages()).toBe(15);
  });

  it('should generate the correct page options', () => {
    component.totalDataCount = 75;
    component.perPageDataCount = 10;

    component.currentPage = 3;
    expect(component.pageOptions()).toEqual([2, 3, 4]);

    component.currentPage = 1;
    expect(component.pageOptions()).toEqual([1, 2]);

    component.currentPage = 8;
    expect(component.pageOptions()).toEqual([7, 8]);
  });

  it('should emit pageChange event when a page is changed', () => {
    let emittedPage = 0;
    component.currentPage = 3;
    component.totalDataCount = 100;
    component.perPageDataCount = 10;
    component.pageChange.subscribe((page) => (emittedPage = page));

    component.changePage(2);
    expect(emittedPage).toBe(2);

    component.changePage(4);
    expect(emittedPage).toBe(4);

    component.prev();
    expect(emittedPage).toBe(3);

    component.next();
    expect(emittedPage).toBe(4);

    component.next();
    expect(emittedPage).toBe(5);

    const limitPages = component.totalPages();
    component.changePage(limitPages);
    component.next();
    expect(emittedPage).toBe(limitPages);
  });
});
