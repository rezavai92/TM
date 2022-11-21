import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthMonitorReadSectionComponent } from './health-monitor-read-section.component';

describe('HealthMonitorReadSectionComponent', () => {
  let component: HealthMonitorReadSectionComponent;
  let fixture: ComponentFixture<HealthMonitorReadSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthMonitorReadSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthMonitorReadSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
