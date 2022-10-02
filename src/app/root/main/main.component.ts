import { Component, HostListener, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  drawerMode : MatDrawerMode="side";
  selectedLanguage = "En";
  screenHeight!: number;
  screenWidth!: number;
  isDrawerOpened =true;
  constructor() { }

  ngOnInit(): void {
    this.getScreenSize();
  }

  setCurrentDrawerMode(){
    if(this.screenWidth>=900){
      this.drawerMode="side";
    }
    else{
      this.drawerMode="over"
    }
  }

  setDrawerVisibilityStatus(){
    this.isDrawerOpened = this.screenWidth>=900 ? true : false;
  }

  updateDrawerConfig(){
    this.setCurrentDrawerMode();
    this.setDrawerVisibilityStatus();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event? : any) {
        console.log("event");
        this.screenHeight = window.innerHeight;
        this.screenWidth = window.innerWidth;
        this.updateDrawerConfig();
  }

}
