import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentManagementMainComponent } from './appointment-management-main.component';

describe('AppointmentManagementMainComponent', () => {
  let component: AppointmentManagementMainComponent;
  let fixture: ComponentFixture<AppointmentManagementMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentManagementMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentManagementMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
