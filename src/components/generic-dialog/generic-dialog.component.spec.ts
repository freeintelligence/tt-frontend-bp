import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenericDialogComponent } from './generic-dialog.component';
import {
  GenericDialogService,
  GenericDialogData,
} from 'src/services/generic-dialog.service';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components.module';

describe('GenericDialogComponent', () => {
  let component: GenericDialogComponent;
  let fixture: ComponentFixture<GenericDialogComponent>;
  let genericDialogService: GenericDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericDialogComponent],
      imports: [FormsModule, ComponentsModule],
      providers: [GenericDialogService],
    });
    fixture = TestBed.createComponent(GenericDialogComponent);
    component = fixture.componentInstance;
    genericDialogService = TestBed.inject(GenericDialogService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show dialog with provided data', () => {
    const dialogData: GenericDialogData = {
      message: 'Test Message',
      buttons: [
        {
          label: 'OK',
          type: 'primary',
          width: 'auto',
          handle: () => {},
        },
      ],
    };

    genericDialogService.show(dialogData);
    fixture.detectChanges();

    const dialogContainer =
      fixture.nativeElement.querySelector('.dialog-container');
    expect(dialogContainer).toBeTruthy();

    const message = fixture.nativeElement.querySelector('p');
    expect(message.textContent?.trim()).toBe(dialogData.message);

    const buttons = fixture.nativeElement.querySelectorAll('app-button');
    expect(buttons.length).toBe(1);

    const button = buttons[0];
    expect(button.textContent?.trim()).toBe('OK');
  });

  it('should hide dialog when status is false', () => {
    let dialogContainer;
    const dialogData: GenericDialogData = {
      message: 'Test Message',
      buttons: [],
    };

    genericDialogService.show(dialogData);
    fixture.detectChanges();

    dialogContainer = fixture.nativeElement.querySelector('.dialog-container');
    expect(dialogContainer).toBeTruthy();

    genericDialogService.hide();
    fixture.detectChanges();

    dialogContainer = fixture.nativeElement.querySelector('.dialog-container');
    expect(dialogContainer).toBeNull();
  });
});
