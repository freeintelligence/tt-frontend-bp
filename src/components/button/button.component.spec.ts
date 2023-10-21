import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let component: ButtonComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent],
    });
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the button type attribute', () => {
    const type = 'submit';
    component.type = type;
    fixture.detectChanges();

    const buttonElement: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.getAttribute('type')).toBe(type);
  });

  it('should set custom width style', () => {
    const width = '200px';
    component.width = width;
    fixture.detectChanges();

    const buttonElement: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.style.width).toBe(width);
  });

  it('should emit a click event', () => {
    let clicked = false;
    component.click.subscribe(() => {
      clicked = true;
    });

    const buttonElement: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    buttonElement.click();

    expect(clicked).toBe(true);
  });

  it('should set color and size classes', () => {
    const color = 'primary';
    const size = 'small';
    component.color = color;
    component.size = size;
    fixture.detectChanges();

    const buttonElement: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.classList.contains(color)).toBe(true);
    expect(buttonElement.classList.contains(size)).toBe(true);
  });
});
