import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentCapsuleGenericItemComponent } from './appointment-capsule-generic-item.component';

describe('AppointmentCapsuleGenericItemComponent', () => {
  let component: AppointmentCapsuleGenericItemComponent;
  let fixture: ComponentFixture<AppointmentCapsuleGenericItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentCapsuleGenericItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentCapsuleGenericItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
