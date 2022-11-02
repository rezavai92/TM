import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { customToastData } from '../../interfaces/custom-toast.interface';

@Component({
  selector: 'app-custom-toast',
  templateUrl: './custom-toast.component.html',
  styleUrls: ['./custom-toast.component.scss']
})
export class CustomToastComponent implements OnInit {

  
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: customToastData) { }




  ngOnInit(): void {
  }

}
