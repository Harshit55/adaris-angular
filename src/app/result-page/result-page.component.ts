import { Component, OnInit, OnDestroy } from '@angular/core';
import {fadeInAnimation} from '../Fade';
import { Router } from '@angular/router';
import {DataTransferService} from '../data-transfer.service';
import {SocialaccountService} from '../socialaccount.service';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css'],
  animations:[fadeInAnimation]
})
export class ResultPageComponent implements OnInit ,OnDestroy{

  result="";
  total="";
  rank="";
  result_icon="";
  icon_color="";
  isOpen=true;
  score_status=""
  constructor(private router:Router,private datatransferservice:DataTransferService,private socialService:SocialaccountService) { }

  ngOnInit() {
    this.result=this.datatransferservice.getScore();
    this.total=this.datatransferservice.getTotal();
    this.rank=this.datatransferservice.getRank();
    if(this.result.length<=0 || !this.socialService.loggedIn) this.router.navigate(['/examlist']);
    if(this.result==null || this.total==null){
      this.router.navigate(['/error']);
    }else{
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
