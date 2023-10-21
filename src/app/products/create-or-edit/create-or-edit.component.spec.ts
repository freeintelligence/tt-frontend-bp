import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditComponent } from './create-or-edit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentsModule } from 'src/components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from 'src/services/product.service';
import { currentDate } from 'src/utils/utils';

describe('CreateOrEditComponent', () => {
  let component: CreateOrEditComponent;
  let fixture: ComponentFixture<CreateOrEditComponent>;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrEditComponent],
      imports: [
        RouterTestingModule,
        ComponentsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [ProductService],
    });
    fixture = TestBed.createComponent(CreateOrEditComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize in "create" mode', () => {
    fixture.detectChanges();
    expect(component.mode).toBe('create');
  });

  it('should reset the form', () => {
    fixture.detectChanges();
    component.form.controls.id.setValue('123');
    component.form.controls.name.setValue('Product 1');
    component.form.controls.description.setValue('Description 1');
    component.form.controls.date_release.setValue(currentDate());

    component.reset();

    expect(component.form.controls.id.value).toBe(null);
    expect(component.form.controls.name.value).toBe(null);
    expect(component.form.controls.description.value).toBe(null);
    expect(component.form.controls.date_release.value).toBe(null);
  });
});
