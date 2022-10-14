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

  // exact equality

  it("2+2 equals 4", () => {
    expect(2 + 2).toBe(4);
  })

  // Object matching

  it("matching person object with Karim", () => {
    const person = { Name: "Rezaul Karim", Designation: "SWE" };
    expect({ Name: "Rezaul Karim", Designation: "SWE" }).toEqual(person);
  })

  // Truthiness

  it("null", () => {
    const n = null;
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).toBeNull();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
  })

  it("zero", () => {
    const z = 0;
    expect(z).toBeFalsy();
    expect(z).toBeDefined();
    expect(z).not.toBeTruthy();
    expect(z).not.toBeNull();
    expect(z).not.toBeUndefined();
  })

  // integer number matching

  it("2+3", () => {
    const sum = 2 + 3;
    expect(sum).toBe(5);
    expect(sum).toBeLessThan(6);
    expect(sum).toBeGreaterThanOrEqual(5);
    expect(sum).toBeLessThanOrEqual(5.1);
    expect(sum).toBeGreaterThan(4.9);


  })

  // folating number
  // Don't use ToBe or ToEqual with floating number;

  it("floating number", () => {

    const float = 0.1 + 0.2;
    expect(float).toBeCloseTo(0.3);
  })

  // string matching

  it("There is  'd' and no F in 'Hello world'  ", () => {

    const str = "Hello world";

    expect(str).not.toMatch(/F/);
    expect(str).toMatch(/d/);
  })


  // arrays and iterables matching

  it("there is milk in the shopping list", () => {

    const shoppingList = ["Pepper", "Sugar", "Soap", "Milk"];

    expect(shoppingList).toContain("Milk");
    expect(new Set(shoppingList)).toContain("Milk");
  })


  // Exception

  it("throw old angular error throws  'Old Angular' error", () => {
    expect(() => component.throwOldAngularError()).toThrow();
    expect(() => component.throwOldAngularError()).toThrowError();
    expect(() => component.throwOldAngularError()).toThrowError('Old Angular')
    expect(() => component.throwOldAngularError()).toThrowError(/Angular/);
  })

});



