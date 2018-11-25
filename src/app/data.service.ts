import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders,HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs-compat';
import {throwError} from 'rxjs';
import { Maindata } from './question';
import {Mainresult} from './result';
import { catchError,retry } from 'rxjs/operators';
import {Examslist} from './examslist';
export interface loginstatus{
  status:string
}
export interface scorestatus{
  score:string
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
  constructor(private http:HttpClient) { }

  initdata(){
    this.qpid=localStorage.getItem("qpid");
    this.getloginurl="https://adaris-exams.herokuapp.com/api/login";
    this.getdataurl="https://adaris-exams.herokuapp.com/api/exams?qpID="+this.qpid+"&action=getQuestionPaper";
    //this.getdataurl="./assets/config.json"
    this.postdataurl="https://adaris-exams.herokuapp.com/api/exams?qpID="+this.qpid+"&action=submitingAnswers";
    this.getexamslisturl="https://adaris-exams.herokuapp.com/api/exams?action=getExamsList";
    this.postloginurl="https://adaris-exams.herokuapp.com/glogin";
  }
  getdata(){
    this.initdata();
    console.log("I am in dataservice---"+this.http.get(this.getdataurl));
    return this.http.get<Maindata>(this.getdataurl).pipe(retry(3),catchError(this.handleError))
  }

  getlogin(logindata){
  return this.http.post<loginstatus>(this.getloginurl,logindata);
  }
  postlogin(id_token){
    return this.http.post<loginstatus>(this.postloginurl,{idtoken: id_token}).pipe(retry(3));
  }
  postdata(data){
    this.initdata();
    return this.http.post<scorestatus>(this.postdataurl,data).pipe(retry(3),catchError(this.handleError));
  }

  getexamslist(){
    return this.http.get<Examslist>(this.getdataurl).pipe(retry(3),catchError(this.handleError));
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
