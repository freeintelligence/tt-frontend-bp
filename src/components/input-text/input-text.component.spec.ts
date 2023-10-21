import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputTextComponent } from './input-text.component';
import { ControlContainer, NgForm } from '@angular/forms';

describe('InputTextComponent', () => {
  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputTextComponent],
      providers: [
        {
          provide: ControlContainer,
          useFactory: (controlContainer?: ControlContainer) => {
            return controlContainer;
          },
          deps: [NgForm],
        },
        NgForm,
      ],
    });

    fixture = TestBed.createComponent(InputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should propagate input changes to the value', () => {
    const inputElement: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    const testValue = 'Test Value';

    inputElement.value = testValue;
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.value).toBe(testValue);
  });

  it('should call the onChange function when input changes', () => {
    const inputElement: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    const testValue = 'Test Value';
    let changedValue = '';

    component.registerOnChange((value: string) => {
      changedValue = value;
    });

    inputElement.value = testValue;
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(changedValue).toBe(testValue);
  });

  it('should call the onTouch function when input is touched', () => {
    const inputElement: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    let touched = false;

    component.registerOnTouched(() => (touched = true));
    inputElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(touched).toBe(true);
  });

  it('should set the disabled state', () => {
    const inputElement: HTMLInputElement =
      fixture.nativeElement.querySelector('input');

    component.setDisabledState(true);
    fixture.detectChanges();
    expect(inputElement.disabled).toBe(true);

    component.setDisabledState(false);
    fixture.detectChanges();
    expect(inputElement.disabled).toBe(false);
  });
});
