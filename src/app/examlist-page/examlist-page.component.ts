import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { fadeInAnimation } from '../Fade';
import {Questioncategory, Questionsubcategory,Questioninfo} from '../questionlist'
import {DataService} from '../data.service';
import {DataTransferService} from '../data-transfer.service';
import {SocialaccountService} from '../socialaccount.service';
import { ApplicationStateServiceService} from '../application-state-service.service'

interface set{
  setname:string,
  settarget:number
}
@Component({
  selector: 'app-examlist-page',
  templateUrl: './examlist-page.component.html',
  styleUrls: ['./examlist-page.component.css'],
  animations:[fadeInAnimation]
})
export class ExamlistPageComponent implements OnInit {
  isOpen=false;
  examslist:Array<Questioncategory>=[];
  exams:Array<Questionsubcategory>=[];
  exam:Array<Questioninfo>=[];
  loginstate:boolean=false;
  isMobile:boolean=false;
  modalid="";

  constructor(private router:Router,private dataservice: DataService,private datatransferservice:DataTransferService,private socialservice:SocialaccountService,private screenstatus:ApplicationStateServiceService) { }

  ngOnInit() {
    this.getexamslist();
    this.isMobile=this.screenstatus.getIsMobileResolution();
  }
  getexamslist(){
    this.dataservice.getexamslist().subscribe(data=>{
      this.examslist=data['categories'];
      console.log("examslist"+this.examslist);
      this.exams=this.examslist[0].groups;
      this.exam=this.exams[0].group_exams;
      this.socialservice.loggedIn.subscribe(loggedin=>{
        this.loginstate=loggedin;
      });
      this.toggle();
    });
  }
  onStartClick(qpid:string,time:string,tot_que:string){
    this.datatransferservice.setqpID(qpid);
    this.datatransferservice.setTime(time);
    this.datatransferservice.setTotal(tot_que);
    if(this.loginstate){
    this.toggle();
    setTimeout(resp =>{
        this.router.navigate(['/start']);
      },300);
    }
  }
  getmodalid(){
    if(!this.loginstate) return "exampleModal";
    else return "";
  }
  toggle(){
    this.isOpen=!this.isOpen;
  }
  onSigninClick(){
    this.socialservice.signInWithGoogle();
  }
  onLogOutClick(){
    this.socialservice.signOutOfGoogle();
  }
}
