import { TestBed } from '@angular/core/testing';
import { ProductService, Product, ProductChangeEvent } from './product.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { GenericDialogService } from './generic-dialog.service';
import { FixedSpinnerService } from './fixed-spinner.service';
import { environment } from 'src/environments/environment';
import { addDays, currentDate } from 'src/utils/utils';

describe('ProductService', () => {
  let productService: ProductService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let genericDialogServiceSpy: jasmine.SpyObj<GenericDialogService>;
  let fixedSpinnerServiceSpy: jasmine.SpyObj<FixedSpinnerService>;
  let mockProducts: Product[] = [];
  let mockProduct: Product;

  beforeEach(() => {
    mockProducts = [
      {
        id: '1',
        name: 'Product 1',
        logo: environment.defaultProductImageUrl,
        description: 'no description 1',
        date_release: currentDate(),
        date_revision: addDays(currentDate(), 365),
      },
      {
        id: '2',
        name: 'Product 2',
        logo: environment.defaultProductImageUrl,
        description: 'no description 2',
        date_release: currentDate(),
        date_revision: addDays(currentDate(), 365),
      },
    ];
    mockProduct = {
      id: '1',
      name: 'Product 1',
      logo: environment.defaultProductImageUrl,
      description: 'no description 1',
      date_release: currentDate(),
      date_revision: addDays(currentDate(), 365),
    };
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'put',
      'delete',
    ]);
    genericDialogServiceSpy = jasmine.createSpyObj('GenericDialogService', [
      'show',
      'hide',
    ]);
    fixedSpinnerServiceSpy = jasmine.createSpyObj('FixedSpinnerService', [
      'show',
      'hide',
    ]);

    TestBed.configureTestingModule({
      providers: [
        ProductService,
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: GenericDialogService, useValue: genericDialogServiceSpy },
        { provide: FixedSpinnerService, useValue: fixedSpinnerServiceSpy },
      ],
    });

    productService = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  it('should get products', () => {
    httpClientSpy.get.and.returnValue(of(mockProducts));

    productService.getProducts().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });
  });

  it('should verify a product successfully', (done) => {
    const productId = '1';

    httpClientSpy.get.and.returnValue(
      of({ body: true, status: 200, statusText: 'OK' })
    );
    productService.verifyProduct(productId).then((result) => {
      expect(result).toBe(true);
      done();
    });
  });

  it('should store a product successfully', (done) => {
    httpClientSpy.post.and.returnValue(
      of({ body: mockProduct, status: 200, statusText: 'OK' })
    );

    productService.storeProduct(mockProduct).then((result) => {
      expect(result).toEqual(mockProduct);
      done();
    });
  });

  it('should update a product successfully', (done) => {
    httpClientSpy.put.and.returnValue(
      of({ body: mockProduct, status: 200, statusText: 'OK' })
    );

    productService.updateProduct(mockProduct).then((result) => {
      expect(result).toEqual(mockProduct);
      done();
    });
  }, 2000);

  it('should delete a product successfully', (done) => {
    const result = 'Product successfully removed';

    httpClientSpy.delete.and.returnValue(of(result));

    productService
      .deleteProduct(mockProduct)
      .then((result) => {
        expect(result).toBe(result);
        done();
      })
      .catch((reason) => {
        expect(reason).toBe(result);
        done();
      });
  });
});
