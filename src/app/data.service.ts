import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders,HttpResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import { Maindata } from './question';
import { catchError,retry } from 'rxjs/operators';
import {Questionlist} from './questionlist';
import {DataTransferService} from './data-transfer.service';

export interface loginstatus{
  status:string
}
export interface scorestatus{
  score:string,
  rank:string
}
@Injectable({
  providedIn: 'root'
})
export class DataService {
  qpid="";
  getloginurl="";
  getdataurl="";
  postdataurl="";
  getexamslisturl="";
  postloginurl="";
  postlogouturl="";
  constructor(private http:HttpClient,private datatransferservice:DataTransferService) { }

  initdata(){
    this.qpid=this.datatransferservice.getqpID();
    this.getloginurl="https://adaris-exams.herokuapp.com/api/login";
    this.getdataurl="https://adaris-exams.herokuapp.com/api/exams?qpID="+this.qpid+"&action=getQuestionPaper";
    //this.getdataurl="./assets/config.json"
    this.postdataurl="https://adaris-exams.herokuapp.com/api/exams?qpID="+this.qpid+"&action=submitingAnswers";
    //this.getexamslisturl="./assets/exam_config.json";
    this.getexamslisturl="https://adaris-exams.herokuapp.com/api/exams?action=getExamsList";
    this.postloginurl="https://adaris-exams.herokuapp.com/api/glogin";
    this.postlogouturl="https://adaris-exams.herokuapp.com/api/glogout";
  }
  getdata(){
    this.initdata();
    console.log("I am in dataservice---"+this.http.get(this.getdataurl));
    return this.http.get<Maindata>(this.getdataurl).pipe(retry(3),catchError(this.handleError))
  }

  getlogin(logindata){
  return this.http.post<loginstatus>(this.getloginurl,logindata);
  }
  postlogin(id_token:string,loginstate:string){
    this.initdata();
    let posturl="";
    if(loginstate=="login") posturl=this.postloginurl+"?idtoken="+id_token;
    else if(loginstate=="logout") posturl=this.postlogouturl+"?idtoken="+id_token;
    return this.http.post<loginstatus>(posturl,id_token).pipe(retry(3));
  }
  postdata(data){
    this.initdata();
    return this.http.post<scorestatus>(this.postdataurl,data).pipe(retry(3),catchError(this.handleError));
  }

  getexamslist(){
    this.initdata();
    return this.http.get<Questionlist>(this.getexamslisturl).pipe(retry(3),catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
        
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };

}
