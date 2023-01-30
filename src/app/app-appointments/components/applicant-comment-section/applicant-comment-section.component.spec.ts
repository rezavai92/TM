import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantCommentSectionComponent } from './applicant-comment-section.component';

describe('ApplicantCommentSectionComponent', () => {
  let component: ApplicantCommentSectionComponent;
  let fixture: ComponentFixture<ApplicantCommentSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantCommentSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantCommentSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
