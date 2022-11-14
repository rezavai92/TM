import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsSearchFilterComponent } from './appointments-search-filter.component';

describe('AppointmentsSearchFilterComponent', () => {
  let component: AppointmentsSearchFilterComponent;
  let fixture: ComponentFixture<AppointmentsSearchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentsSearchFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentsSearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
