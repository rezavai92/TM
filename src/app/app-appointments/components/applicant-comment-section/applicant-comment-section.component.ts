import { Component, Input, OnInit } from '@angular/core';
import { ICapsuleItemData } from '../../interfaces/capsule.interface';

@Component({
  selector: 'app-applicant-comment-section',
  templateUrl: './applicant-comment-section.component.html',
  styleUrls: ['./applicant-comment-section.component.scss']
})
export class ApplicantCommentSectionComponent implements OnInit {

  @Input() comment: string = "";
  capsuleData!: ICapsuleItemData[];
  constructor() { }

  ngOnInit(): void {
    this.prepareCapsuleData();
  }

  prepareCapsuleData() {
    this.capsuleData = [{
      type: "plain",
      value: this.comment,
      //labelKey : 'COMMENT'
    }]
      
  }

}
