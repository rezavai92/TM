import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmPdfViewerComponent } from './tm-pdf-viewer.component';

describe('TmPdfViewerComponent', () => {
  let component: TmPdfViewerComponent;
  let fixture: ComponentFixture<TmPdfViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TmPdfViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TmPdfViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
