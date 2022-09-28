import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInfoFormComponent } from './general-info-form.component';

describe('GeneralInfoFormComponent', () => {
  let component: GeneralInfoFormComponent;
  let fixture: ComponentFixture<GeneralInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralInfoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
