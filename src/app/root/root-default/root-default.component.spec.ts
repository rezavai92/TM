import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateService, TranslateStore } from '@ngx-translate/core';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { TranslateServiceStub } from '../../shared/test-mocks/translate.mock';

import { RootDefaultComponent } from './root-default.component';

describe('RootDefaultComponent', () => {
  let component: RootDefaultComponent;
  let fixture: ComponentFixture<RootDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RootDefaultComponent],
      imports: [RouterTestingModule, MaterialModule],
      providers: [{ provide: TranslateService, useClass: TranslateServiceStub }]

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RootDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
