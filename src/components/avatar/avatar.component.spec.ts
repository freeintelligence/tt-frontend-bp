import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarComponent } from './avatar.component';
import { environment } from 'src/environments/environment';

describe('AvatarComponent', () => {
  let fixture: ComponentFixture<AvatarComponent>;
  let component: AvatarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvatarComponent],
    });
    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the image with the provided src', () => {
    const src = environment.defaultProductImageUrl;
    component.src = src;
    fixture.detectChanges();

    const imgElement: HTMLImageElement =
      fixture.nativeElement.querySelector('img');
    expect(imgElement).toBeTruthy();
    expect(imgElement.src).toBe(src);
  });

  it('should set custom width and height styles', () => {
    const width = '100px';
    const height = '150px';
    component.width = width;
    component.height = height;
    fixture.detectChanges();

    const imgElement: HTMLImageElement =
      fixture.nativeElement.querySelector('img');
    expect(imgElement).toBeTruthy();
    expect(imgElement.style.width).toBe(width);
    expect(imgElement.style.height).toBe(height);
  });
});
