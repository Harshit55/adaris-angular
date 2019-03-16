import { Component, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { DataTransferService } from '../data-transfer.service';
import { ApplicationStateServiceService } from '../application-state-service.service';
import { Questions, Maindata, Options, Sections } from '../question';
import { Answerset, Mainresult, Sectionset } from '../result';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../Fade';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { SocialaccountService } from '../socialaccount.service';

@Component({
  selector: 'app-exam-page',
  templateUrl: './exam-page.component.html',
  styleUrls: ['./exam-page.component.css'],
  animations: [fadeInAnimation]
})
export class ExamPageComponent implements OnInit, AfterViewChecked, OnDestroy {
  quenumber = 0;
  secnumber = 0;
  checked = true;
  mainresult: Mainresult = {
    qpID: "",
    sections: []
  };
  saveoID: number;
  options: Array<Options> = [];
  option: string = "";
  maindata: Maindata = {
    sections: [],
    parentQuestions: []
  };
  questions: Array<Questions> = [];
  sections: Array<Sections> = [];
  parents: object = {};
  sectionset: Sectionset = { answers: [] }
  answerSections: Array<Sectionset> = []
  answers: Array<Answerset> = []
  answerset: Answerset;
  selectedoID = -1;
  selectedqID = -1;
  result: Array<object> = [];
  duration = 60 * 30;
  timerdisplay;
  timerprocess;
  isOpen = false;
  total = "";
  continue = false;
  questionmaster = "";
  hasMaster = false;
  _opened: boolean = false;
  questionslength: number = 0;
  answernum = 0;
  sets: Array<Sectionset> = [];
  dataLoaded: boolean = false;
  prevsec: object = {};
  isMobile: boolean = false;

  constructor(private dataservice: DataService, private route: Router, private Screenstatus: ApplicationStateServiceService, private datatransferservice: DataTransferService, private soicalservice: SocialaccountService) { }
  ngOnInit() {
    if (this.datatransferservice.getqpID().length <= 0 || !this.soicalservice.loggedIn) this.route.navigate(['/examlist']);
    else {
      this.soicalservice.setComponent("exam_page");
      this.getreqdata();
      this.timerdisplay = "30:00";
      this.settimer();
      this.mainresult.sections = [];
      this.isMobile = this.Screenstatus.getIsMobileResolution();
    }
  }
  getreqdata() {
    this.dataservice.getdata()
      .subscribe(data => {
        this.secnumber = 0;
        this.maindata = data;
        this.sections = data['sections'];
        this.parents = data['parentQuestions'];
        this.questions = this.sections[this.secnumber].questions;
        this.questionslength = this.questions.length;
        this.options = this.questions[this.quenumber].options;
        this.selectedqID = this.questions[this.quenumber].qID;
        console.log("The data we got is:" + this.options[0].option);
        this.createSets();
        this.total = this.questions.length.toString();
        if (this.questions.length > 0) {
          this.dataLoaded = true;
          this.toggle();
        }
        this.showquestion();
        this.showquestionmaster();
      }, error => {
        this.route.navigate(['/error']);
      });
  }
  saveanswerset() {
    if (this.selectedqID < 0) { this.selectedqID = this.sections[this.secnumber].questions[this.quenumber].qID; }
    this.answerset = { qID: this.selectedqID, oID: this.selectedoID }
    this.sectionset = this.sets[this.secnumber];
    this.sectionset.answers[this.quenumber] = this.answerset;
    /*if (this.mainresult.sections.length>0) {
      if(this.answerExists(this.mainresult.sections[this.secnumber].answers,this.selectedoID)!=-1){
      this.answerSections[this.answerExists(this.mainresult.sections[this.secnumber].answers,this.selectedoID)] = this.sectionset;
      }else {this.answerSections[this.answernum] = this.sectionset;this.answernum++;}
    }else {this.answerSections[this.answernum] = this.sectionset;this.answernum++;}*/
    this.mainresult.sections[this.secnumber] = this.sectionset;
    //console.log("saved data: qID--> " + this.mainresult.sections[this.secnumber].answers[this.quenumber].qID + "oID--> " + this.mainresult.sections[this.secnumber].answers[this.quenumber].oID);
  }
  createSets() {
    let sidx = 0;
    this.sections.forEach(element => {
      let set: Sectionset = { answers: [] };
      let idx = 0;
      this.prevsec[sidx] = 0;
      element.questions.forEach(question => {
        set.answers[idx] = { qID: question.qID, oID: -2 };
        idx++;
      });
      this.sets.push(set);
      sidx++;
    });
  }
  OnQuestionChange(ng: number, sg: number) {
    this.selectedqID = this.questions[this.quenumber].qID;
    this.prevsec[this.secnumber] = this.quenumber;
    this.saveanswerset();
    if (ng == 0) { if (this.quenumber < this.questions.length) this.quenumber++; }
    else if (ng == 1) { if (this.quenumber > 0) this.quenumber--; }
    else { this.secnumber = sg; this.quenumber = this.prevsec[this.secnumber] }
    this.refereshData();
    this.getprevopts();
  }
  getprevopts() {
    if (this.mainresult.sections[this.secnumber] != undefined && this.mainresult.sections[this.secnumber].answers.length >= this.quenumber + 1) {
      if (this.mainresult.sections[this.secnumber].answers[this.quenumber].oID > 0) {
        this.selectedoID = this.mainresult.sections[this.secnumber].answers[this.quenumber].oID;
        console.log("Prev selected oID--> " + this.mainresult.sections[this.secnumber].answers[this.quenumber].oID);
      }
      else this.selectedoID = -1;
    }
    else this.selectedoID = -1;
  }
  OnClearClick() {
    this.selectedqID = this.questions[this.quenumber].qID;
    var radio = document.getElementById("radio_" + this.selectedoID) as HTMLInputElement;
    if (radio != null) {
      radio.checked = false;
      this.selectedoID = -1;
      this.saveanswerset();
    }
  }
  ngAfterViewChecked() {
    var radio = document.getElementById("radio_" + this.selectedoID) as HTMLInputElement;
    var next = document.getElementById("next") as HTMLInputElement;
    var prev = document.getElementById("prev") as HTMLInputElement;
    if (radio != null) radio.checked = true;
    if (next != undefined) {
      if (this.quenumber + 1 == this.questions.length) {
        next.disabled = true;
      }
      else next.disabled = false;
      if (this.quenumber <= 0) {
        prev.disabled = true;
      }
      else prev.disabled = false;
    }
  }

  showquestion() {
    if (this.questions.length > 0 && this.questions[this.quenumber] != undefined) {
      var displayquestion = this.questions[this.quenumber].question;
      return displayquestion;
    }
    else {
      return "please wait";
    }
  }
  getoptions(opt, oID) {
    if (this.questions.length > 0) {
      var optdata = this.questions[this.quenumber].options[opt].option;
      var oIDdata = this.questions[this.quenumber].options[opt].oID;
      if (oID) {
        return oIDdata;
      }
      else if (optdata.length > 0) {
        return optdata;
      }
    } else {
      return "Please Wait";
    }
  }
  OnOptionClick(opt) {
    this.selectedqID = this.questions[this.quenumber].qID;
    this.selectedoID = opt;
    this.saveanswerset();
    console.log(this.selectedoID + "&&" + this.selectedqID);
  }
  OnSubmitClick() {
    if(this._opened)this._toggleSidebar();
    if (!(this.mainresult.sections.length == 0 || this.getanswerstatus(this.mainresult.sections))) {
      this.submitresults();
    }
  }
  getModalId(){
    if(this.mainresult.sections.length == 0 || this.getanswerstatus(this.mainresult.sections)) return "exampleModal";
    else return "";
  }
  submitresults() {
    this.toggle();
    if (this._opened = false) this._toggleSidebar();
    this.mainresult.qpID = this.datatransferservice.getqpID();
    this.dataservice.postdata(this.mainresult).subscribe(resp => {
      this.datatransferservice.setScore(resp.score);
      this.datatransferservice.setTotal(this.gettotalquestion());
      this.datatransferservice.setRank(resp.rank);
      this.soicalservice.setComponent("");
      this.route.navigate(['/results']);
    }, error => {
      this.route.navigate(['/error']);
    });
  }
  gettotalquestion() {
    let total = 0;
    this.sections.forEach(function (questionset) {
      total += questionset.questions.length;
    });
    return total.toString();
  }
  getanswerstatus(result) {
    var answerstatus = false;
    if (result.length == this.sections.length) {
      result.forEach(answer => {
        answer.answers.forEach(element => {
          if (element.oID < 0) {
            answerstatus = true;
          }
        });
      });
      return answerstatus;
    }
    else return true;
  }
  answerExists(result, oID) {
    var index = -1;
    result.forEach(element => {
      if (element.oID == oID) {
        index = result.indexOf(element);
      }
    });
    return index;
  }
  settimer() {
    var time = this.duration, minutes, seconds;
    this.timerprocess = setInterval(() => {
      minutes = parseInt((time / 60) + "", 10)
      seconds = parseInt((time % 60) + "", 10);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      this.timerdisplay = minutes + ":" + seconds;
      if (--time < 0) {
        this.submitresults();
        clearInterval(this.timerprocess);
      }
    }, 1000);
  }

  showtime() {
    var time = this.timerdisplay;
    return time;
  }
  toggle() {
    this.isOpen = !this.isOpen;
  }
  showquestionmaster() {
    if (this.questions.length > 0) {
      var master = this.questions[this.quenumber].pQID;
      var index = this.getindex(master);
      if (index != -1) {
        this.hasMaster = false;
        return index;
      }
      else this.hasMaster = true;
    }
  }
  getindex(master) {
    var index = -1;
    var masterque = master + "";
    if (this.parents[masterque] != undefined) {
      if (this.parents[masterque].length > 0) index = this.parents[masterque];
    }
    return index;
  }
  togglemasterquestion() {
    this.hasMaster = !this.hasMaster;
  }
  getquestion(que_idx, sec_idx) {
    if (this.dataLoaded) {
      this.saveanswerset();
      this.quenumber = que_idx;
      this.secnumber = sec_idx;
      this.refereshData();
      this.getprevopts();
      this._toggleSidebar();
      console.log("this.secnumber-->" + this.secnumber);
    }
  }
  _toggleSidebar() {
    this._opened = !this._opened;
  }
  OnTabSwitch() {
    this.secnumber = 1;
  }
  ngOnDestroy() {
    clearInterval(this.timerprocess);
  }
  onTabChange(tabEvent: MatTabChangeEvent) {
    console.log("tab changed tab index" + tabEvent.index);
    this.OnQuestionChange(2, tabEvent.index);
  }
  refereshData() {
    this.questions = this.sections[this.secnumber].questions;
    this.options = this.questions[this.quenumber].options;
    this.showquestionmaster();
    this.total = this.questions.length.toString();
    this.selectedqID = this.questions[this.quenumber].qID;
  }
}
