import { Component, OnInit, OnDestroy } from '@angular/core';
import {fadeInAnimation} from '../Fade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css'],
  animations:[fadeInAnimation]
})
export class ResultPageComponent implements OnInit ,OnDestroy{

  result="";
  total="";
  result_icon="";
  icon_color="";
  isOpen=true;
  score_status=""
  constructor(private router:Router) { }

  ngOnInit() {
    this.result=localStorage.getItem("result");
    this.total=localStorage.getItem("total");
    if(this.result==null || this.total==null){
      this.router.navigate(['/error']);
    }else{
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
  }
  }
  toggle(){
    this.isOpen=!this.isOpen;
  }
  iconcolor(){
    return this.icon_color;
  }

  ngOnDestroy(){
    localStorage.clear();
  }
}
