import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {DataService} from '../data.service';
import {fadeInAnimation} from '../Fade';
export interface loginobj{
  mail:string,
  pwd:string
}
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  animations: [fadeInAnimation]
})
export class LoginPageComponent implements OnInit {
  isOpen=true;
  Username="";
  Email="";
  Password="";
  signupele="";
  loginstatus="";
  loginsuccess={
    status:""
  };
  logindata: loginobj={
    mail:"",
    pwd:""
  }
  constructor(private route: Router,private dataservice:DataService) { }
  ngOnInit() {
    localStorage.clear();
    this.loginstatus="Sign Up";
  }
  updateusername(userName){
    this.Username=userName;
    return this.Username;
  }

  updateemail(email){
    this.Email=email;
    return this.Email;
  }

  updatepassword(password){
    this.Password=password;
    return this.Password;
  }
  navigate(){
      this.route.navigate(['/start']);
  }
  OnLoginClick(){
    if(this.loginstatus=="Sign Up"){
      this.signupele="none";
      this.loginstatus="Login";
      localStorage.setItem("loginstate","login");
    }
    else{
      this.logindata={
        mail:this.Username,
        pwd:this.Password
      }
      this.toggle();
      this.dataservice.getlogin(this.logindata).subscribe(resp=>{
        this.loginsuccess=resp;
        if(this.loginsuccess.status=="SUCCESS"){};
          this.navigate();
        })
    }
  }
  OnSignupClick(){
    if(this.loginstatus=="Login"){
      this.signupele="";
      this.loginstatus="Sign Up";
      localStorage.setItem("loginstate","signup");
    }
  }
  toggle() {
    this.isOpen = !this.isOpen;
  }

}
