import { Component, OnInit, OnChanges, AfterViewChecked, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Questions, Maindata, Options } from '../question';
import { Answerset, Mainresult } from '../result';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../Fade';
@Component({
  selector: 'app-exam-page',
  templateUrl: './exam-page.component.html',
  styleUrls: ['./exam-page.component.css'],
  animations: [fadeInAnimation]
})
export class ExamPageComponent implements OnInit, OnChanges, AfterViewChecked, OnDestroy {
  quenumber = 0;
  checked = true;
  mainresult: Mainresult = {
    qpID: "",
    answers: []
  };
  saveoID: number;
  options: Array<Options> = [];
  option: string = "";
  maindata: Maindata = {
    questions: []
  };
  questions: Array<Questions> = [];
  answerset: Answerset;
  selectedoID = -1;
  selectedqID = -1;
  result: Array<object> = [];
  duration = 60 * 20;
  timerdisplay;
  timerprocess;
  isOpen = false;
  total = "";
  continue = false;
  constructor(private dataservice: DataService, private route: Router) { }
  ngOnInit() {
    this.getreqdata();
    this.showquestion();
    this.timerdisplay = "20:00";
    this.settimer();
  }
  ngOnChanges() {
  }
  getreqdata() {
    this.dataservice.getdata()
      .subscribe(data => {
        this.maindata = data;
        this.questions = data['questions'];
        this.options = this.questions[this.quenumber].options;
        console.log("The data we got is:" + this.options[0].option);
        this.total = this.questions.length.toString();
        if (this.total.length > 0) this.toggle();
      }, error => {
        this.route.navigate(['/error']);
      });
  }
  saveanswerset() {
    this.answerset = { qID: this.selectedqID, oID: this.selectedoID }
    this.mainresult.answers[this.quenumber] = (this.answerset);
    console.log("saved data: qID--> " + this.mainresult.answers[this.quenumber].qID + "oID--> " + this.mainresult.answers[this.quenumber].oID);
  }
  OnNextClick() {
    this.selectedqID = this.questions[this.quenumber].qID;
    if (this.quenumber < this.questions.length - 1) {
      this.saveanswerset();
      this.quenumber++;
      this.options = this.questions[this.quenumber].options;
      if (this.mainresult.answers.length >= this.quenumber + 1) {
        if (this.mainresult.answers[this.quenumber].oID > 0) {
          this.selectedoID = this.mainresult.answers[this.quenumber].oID;
          console.log("Prev selected oID--> " + this.mainresult.answers[this.quenumber].oID);
        }
        else
          this.selectedoID = -1;
      }
      else
        this.selectedoID = -1;
    }
    else {
      window.alert("End of Session");
    }
  }
  OnPrevClick() {
    this.selectedqID = this.questions[this.quenumber].qID;
    if (this.quenumber > 0) {
      this.saveanswerset();
      this.quenumber--;
      this.options = this.questions[this.quenumber].options;
      if (this.mainresult.answers[this.quenumber].oID > 0) {
        this.selectedoID = this.mainresult.answers[this.quenumber].oID;
        console.log("Prev selected oID--> " + this.mainresult.answers[this.quenumber].oID);
      }
      else
        this.selectedoID = -1;
    }
    else {
      window.alert("This is the First question.");
    }
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
    if (this.questions.length > 0) {
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
    if (this.getanswerstatus(this.mainresult.answers)) {
      this.continue = window.confirm("You did not answer all the questions.Do you want to continue?");
      if (this.continue) this.submitresults();
    }else{
    this.submitresults();
  }
}
  submitresults() {
    this.toggle();
    this.mainresult.qpID=localStorage.getItem("qpid");
    this.dataservice.postdata(this.mainresult).subscribe(resp => {
      localStorage.setItem("result", resp.score);
      localStorage.setItem("total", this.questions.length.toString());
      this.route.navigate(['/results']);
    },error=>{
      this.route.navigate(['/error']);
    });
  }
  getanswerstatus(result) {
    var answerstatus = false;
    if (result.length > 0) {
      result.forEach(element => {
        if (element.oID < 0) {
          answerstatus = true;
        }
      });
      return answerstatus;
    }
    else return true;
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
  ngOnDestroy() {
    clearInterval(this.timerprocess);
  }
}
