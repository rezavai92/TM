import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StethoscopeReadSectionComponent } from './stethoscope-read-section.component';

describe('StethoscopeReadSectionComponent', () => {
  let component: StethoscopeReadSectionComponent;
  let fixture: ComponentFixture<StethoscopeReadSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StethoscopeReadSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StethoscopeReadSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
