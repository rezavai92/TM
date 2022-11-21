import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtoscopeReadSectionComponent } from './otoscope-read-section.component';

describe('OtoscopeReadSectionComponent', () => {
  let component: OtoscopeReadSectionComponent;
  let fixture: ComponentFixture<OtoscopeReadSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtoscopeReadSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtoscopeReadSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
