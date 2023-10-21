import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectTextComponent } from './select-text.component';

describe('SelectTextComponent', () => {
  let component: SelectTextComponent;
  let fixture: ComponentFixture<SelectTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectTextComponent],
    });
    fixture = TestBed.createComponent(SelectTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should propagate changes to the form control', () => {
    const testValue = 'Test Value';

    component.writeValue(testValue);
    expect(component.value).toEqual(testValue);
  });

  it('should register a change in the form control', () => {
    let changedValue = '';

    component.registerOnChange((value: any) => (changedValue = value));
    component.onInput({ target: { value: 'New Value' } });

    expect(changedValue).toBe('New Value');
  });

  it('should register a touch in the form control', () => {
    let touched = false;

    component.registerOnTouched(() => (touched = true));
    component.onInput({ target: { value: 'New Value' } });

    expect(touched).toBe(true);
  });

  it('should render the options in the select element', () => {
    const options = [
      { label: 'Option 1', value: 'value1' },
      { label: 'Option 2', value: 'value2' },
      { label: 'Option 3', value: 'value3' },
    ];
    component.options = options;
    fixture.detectChanges();

    const selectElement = fixture.nativeElement.querySelector('select');
    expect(selectElement).toBeTruthy();

    const optionElements = selectElement.querySelectorAll('option');
    expect(optionElements.length).toBe(options.length);

    optionElements.forEach((option: HTMLOptionElement, index: number) => {
      expect(option.textContent?.trim()).toBe(options[index].label);
      expect(option.value).toBe(options[index].value);
    });
  });

  it('should handle the disabled state', () => {
    component.isDisabled = true;
    fixture.detectChanges();

    const selectElement = fixture.nativeElement.querySelector('select');
    expect(selectElement.disabled).toBe(true);

    component.isDisabled = false;
    fixture.detectChanges();
    expect(selectElement.disabled).toBe(false);
  });
});
