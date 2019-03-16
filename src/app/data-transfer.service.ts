import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'angularx-social-login';
@Injectable({
  providedIn: 'root'
})
export class DataTransferService {


  private messageSource = new BehaviorSubject('Loading data');
  currentMessage = this.messageSource.asObservable();

  qpID="";
  score="";
  total="";
  rank="";
  time="";
  totalques="";
  constructor() { }
  googleAuth:AuthService;
  changeMessage(message: string) {
    this.messageSource.next(message)
  }
  setGoogleAuth(googleAuth:AuthService){
    this.googleAuth=googleAuth;
  }
  setqpID(qpID:string){
    this.qpID=qpID;
  }
  getqpID(){
    return this.qpID;
  }
  setScore(score:string){
    this.score=score;
  }
  getScore(){
    return this.score;
  }
  setTotal(total:string){
    this.total=total;
  }
  getTotal(){
    return this.total;
  }
  setRank(rank:string){
    this.rank=rank;
  }
  getRank(){
    return this.rank;
  }
  setTime(time:string){
    this.time=time;
  }
  getTime(){
    return this.time;
  }
  setTotalQues(totalques:string){
   this.totalques = totalques;
  }
  getTotalQues(){
    return this.totalques;
  }
}