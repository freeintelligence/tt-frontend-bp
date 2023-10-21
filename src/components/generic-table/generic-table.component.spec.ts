import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenericTableComponent, TableHeader } from './generic-table.component';
import { By } from '@angular/platform-browser';
import { ComponentsModule } from '../components.module';
import { environment } from 'src/environments/environment';

describe('GenericTableComponent', () => {
  let component: GenericTableComponent;
  let fixture: ComponentFixture<GenericTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericTableComponent],
      imports: [ComponentsModule],
    });
    fixture = TestBed.createComponent(GenericTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display headers correctly', () => {
    const headers: TableHeader[] = [
      { label: 'Name', key: 'name', type: 'text' },
      { label: 'Image', key: 'image', type: 'imageUrl' },
      { label: 'Options', type: 'dropdown', dropdownOptions: [] },
    ];

    component.headers = headers;
    fixture.detectChanges();

    const thElements = fixture.debugElement.queryAll(By.css('th'));
    expect(thElements.length).toBe(headers.length);

    for (let i in headers) {
      expect(thElements[i].nativeElement.textContent).toBe(headers[i].label);
    }
  });

  it('should display data correctly', () => {
    const headers: TableHeader[] = [
      { label: 'Name', key: 'name', type: 'text' },
      { label: 'Image', key: 'image', type: 'imageUrl' },
      { label: 'Options', type: 'dropdown', dropdownOptions: [] },
    ];
    const data = [
      { name: 'Item 1', image: environment.defaultProductImageUrl },
      { name: 'Item 2', image: environment.defaultProductImageUrl },
    ];

    component.headers = headers;
    component.data = data;
    fixture.detectChanges();

    const tdElements = fixture.debugElement.queryAll(By.css('td'));
    expect(tdElements.length).toBe(6);
    expect(tdElements[0].nativeElement.textContent).toBe(data[0].name);
    expect(tdElements[1].query(By.css('app-avatar'))).toBeTruthy();
    expect(tdElements[2].query(By.css('app-dropdown'))).toBeTruthy();
  });

  it('should set parameters to dropdown options', () => {
    const headers: TableHeader[] = [
      {
        label: 'Options',
        type: 'dropdown',
        dropdownOptions: [{ label: 'Option 1' }, { label: 'Option 2' }],
      },
    ];
    const data = [{ name: 'Item 1' }, { name: 'Item 2' }];

    component.headers = headers;
    component.data = data;
    fixture.detectChanges();

    const dropdown = fixture.debugElement.query(By.css('app-dropdown'));
    const dropdownComponent = dropdown.componentInstance as any;
    expect(dropdownComponent.options[0].parameters).toEqual(data[0]);
  });

  it('should transform values', () => {
    const headers: TableHeader[] = [
      {
        label: 'Name',
        key: 'name',
        type: 'text',
        valueTransform: (value: unknown) => {
          if (typeof value === 'string') {
            return value.toUpperCase();
          }

          return value as string;
        },
      },
    ];
    const data = [{ name: 'Item 1' }];

    component.headers = headers;
    component.data = data;
    fixture.detectChanges();

    const tdElement = fixture.debugElement.query(By.css('td'));
    expect(tdElement.nativeElement.textContent).toBe(
      data[0].name.toUpperCase()
    );
  });
});
