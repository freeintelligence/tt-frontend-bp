import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent, AlertButton } from './alert.component';
import { ComponentsModule } from '../components.module';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertComponent],
      imports: [ComponentsModule],
    });
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the message', () => {
    const message = 'This is an alert message';
    component.message = message;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain(message);
  });

  it('should apply the danger color', () => {
    component.color = 'danger';
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.danger')).toBeTruthy();
  });

  it('should handle button click', () => {
    const button: AlertButton = {
      label: 'OK',
      handle: () => null,
    };
    component.buttons = [button];
    fixture.detectChanges();

    const buttonElement = fixture.nativeElement.querySelector('app-button');
    const clickSpy = spyOn(buttonElement, 'click');
    buttonElement.click();
    fixture.detectChanges();

    expect(buttonElement).toBeTruthy();
    expect(clickSpy).toHaveBeenCalled();
  });

  it('should display multiple buttons', () => {
    const buttons: AlertButton[] = [
      { label: 'Yes', color: 'primary', handle: () => null },
      { label: 'No', color: 'secondary', handle: () => null },
    ];
    component.buttons = buttons;
    fixture.detectChanges();

    const buttonElementsNode =
      fixture.nativeElement.querySelectorAll('app-button');
    const buttonElements = Array.from(buttonElementsNode);

    buttonElements.forEach((button: any, index) => {
      const clickSpy = spyOn(button, 'click');
      button.click();

      expect(button).toBeTruthy();
      expect(clickSpy).toHaveBeenCalled();
    });
  });
});
