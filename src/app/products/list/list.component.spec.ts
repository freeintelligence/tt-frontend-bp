import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ListComponent } from './list.component';
import { Product, ProductService } from 'src/services/product.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableHeader } from 'src/components/generic-table/generic-table.component';
import { ComponentsModule } from 'src/components/components.module';
import { HttpClientModule } from '@angular/common/http';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [
        RouterTestingModule,
        ComponentsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [ProductService],
    });
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty data and searchTerm', () => {
    fixture.detectChanges();
    expect(component.data).toBeUndefined();
    expect(component.fetchError).toBeUndefined();
    expect(component.searchTerm).toBe('');
  });

  it('should call getProducts() on ngOnInit', () => {
    const getProductsSpy = spyOn(productService, 'getProducts').and.returnValue(
      of([])
    );
    fixture.detectChanges();
    expect(getProductsSpy).toHaveBeenCalled();
  });

  it('should filter products based on search term', () => {
    let filtered: Product[] | undefined = [];

    component.data = [
      { name: 'Product 1', description: 'Description 1' },
      { name: 'Product 2', description: 'Description 2' },
    ];

    component.searchTerm = 'Product';
    filtered = component.filteredProducts();
    expect(filtered?.length).toBe(2);
  });

  it('should handle error when fetching products', () => {
    spyOn(productService, 'getProducts').and.returnValue(
      throwError('Test error')
    );

    component.getProducts();

    expect(component.fetchError).toBeDefined();
  });

  it('should display products when data is available', () => {
    const headers: TableHeader[] = [
      {
        label: 'ID',
        key: 'id',
        type: 'text',
      },
      {
        label: 'Name',
        key: 'name',
        type: 'text',
      },
      {
        label: 'Description',
        key: 'description',
        type: 'text',
      },
    ];

    const mockData = [
      { id: '1', name: 'Product 1', description: 'Description 1' },
      { id: '2', name: 'Product 2', description: 'Description 2' },
    ];

    component.headers = headers;
    spyOn(productService, 'getProducts').and.returnValue(of(mockData));

    fixture.detectChanges();
    expect(component.data).toEqual(mockData);

    const tableData = fixture.debugElement.query(By.css('app-generic-table'));
    expect(tableData).toBeTruthy();
  });
});
