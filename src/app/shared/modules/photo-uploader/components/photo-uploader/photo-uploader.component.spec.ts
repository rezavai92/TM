import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../../material/material.module';

import { PhotoUploaderComponent } from './photo-uploader.component';

describe('PhotoUploaderComponent', () => {
  let component: PhotoUploaderComponent;
  let fixture: ComponentFixture<PhotoUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotoUploaderComponent],
      imports: [MaterialModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PhotoUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
