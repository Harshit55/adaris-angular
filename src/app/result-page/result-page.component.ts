import { Component, OnInit } from '@angular/core';
import {fadeInAnimation} from '../Fade'

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css'],
  animations:[fadeInAnimation]
})
export class ResultPageComponent implements OnInit {

  result="";
  total="";
  result_icon="";
  icon_color="";
  isOpen=true;
  score_status=""
  constructor() { }

  ngOnInit() {
    this.result=localStorage.getItem("result");
    this.total=localStorage.getItem("total");
    //this.result="2";
    //this.total="6";
    if(( parseInt(this.total))/2>(parseInt(this.result))){
      this.icon_color="#e5e500";
      this.result_icon="error";
      this.score_status="Need Some Work!";
    }else{
      this.icon_color="green";
      this.result_icon="check_circle";
      this.score_status="Great Work!";
    }
    localStorage.clear();
  }
  toggle(){
    this.isOpen=!this.isOpen;
  }
  iconcolor(){
    return this.icon_color;
  }

}
