import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentCapsuleComponent } from './appointment-capsule.component';

describe('AppointmentCapsuleComponent', () => {
  let component: AppointmentCapsuleComponent;
  let fixture: ComponentFixture<AppointmentCapsuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentCapsuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentCapsuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
