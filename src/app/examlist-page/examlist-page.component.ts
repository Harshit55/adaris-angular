import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { fadeInAnimation } from '../Fade';
import {Examslist,Exams, Exam} from '../examslist'
import {DataService} from '../data.service'

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
  qpidset={
    set1:"5",
    set2:"7",
    set3:"8",
    set4:"9",
    set5:"10"
  }
  set1:set;
  set2:set;
  set3:set;
  set4:set;
  set5:set;
  setarr:Array<set>=[]
  isOpen=true;
  examslist:Examslist;
  exams:Array<Exams>=[];
  exam:Array<Exam>=[];
  constructor(private router:Router,private dataservice: DataService) { }

  ngOnInit() {
    this.generateset();
    //this.getexamslist();
  }
  getexamslist(){
    this.dataservice.getexamslist().subscribe(data=>{
      this.examslist=data['examslist'];
      this.exams=this.examslist.exams;
    });
  }
  onStartClick(qpid){
    localStorage.setItem("qpid",qpid);
    this.toggle();
    setTimeout(resp =>{
        this.router.navigate(['/login']);
      },300);
  }
  generateset(){
    this.set1={
      setname:"quiz-1",
      settarget:1
    }
    this.set2={
      setname:"quiz-2",
      settarget:2
    }
    this.set3={
      setname:"quiz-3",
      settarget:3
    }
    this.set4={
      setname:"quiz-4",
      settarget:4
    }
    this.set5={
      setname:"quiz-5",
      settarget:5
    }
    this.setarr.push(this.set1);
    this.setarr.push(this.set2);
    this.setarr.push(this.set3);
    this.setarr.push(this.set4);
    this.setarr.push(this.set5);
  }
  toggle(){
    this.isOpen=!this.isOpen;
  }

}
