import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownComponent, DropdownOption } from './dropdown.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `<app-dropdown [options]="dropdownOptions"></app-dropdown>`,
})
class TestHostComponent {
  dropdownOptions!: DropdownOption[];
}

describe('DropdownComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let component: DropdownComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownComponent, TestHostComponent],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    component = fixture.debugElement.query(
      By.directive(DropdownComponent)
    ).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render options correctly', () => {
    const option1 = {
      label: 'Option 1',
      handle: jasmine.createSpy('option1'),
      parameters: 'param1',
    };
    const option2 = {
      label: 'Option 2',
      handle: jasmine.createSpy('option2'),
      parameters: 'param2',
    };
    hostComponent.dropdownOptions = [option1, option2];
    fixture.detectChanges();

    const optionElements: DebugElement[] = fixture.debugElement.queryAll(
      By.css('.dropdown-content a')
    );
    expect(optionElements.length).toBe(2);
    expect(optionElements[0].nativeElement.textContent).toContain(
      option1.label
    );
    expect(optionElements[1].nativeElement.textContent).toContain(
      option2.label
    );

    optionElements[0].triggerEventHandler('click', null);
    expect(option1.handle).toHaveBeenCalledWith(option1.parameters);

    optionElements[1].triggerEventHandler('click', null);
    expect(option2.handle).toHaveBeenCalledWith(option2.parameters);
  });
});
