import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankInfoFormComponent } from './bank-info-form.component';

describe('BankInfoFormComponent', () => {
  let component: BankInfoFormComponent;
  let fixture: ComponentFixture<BankInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BankInfoFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BankInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
