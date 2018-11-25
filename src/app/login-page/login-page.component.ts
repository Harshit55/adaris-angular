import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {DataService} from '../data.service';
import {fadeInAnimation} from '../Fade';
import {GoogleSignInSuccess} from 'angular-google-signin'; 

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
  private myClientId: string = '819187862405-vm99bok378vdgr4jrpo3c1k8vefkl1va.apps.googleusercontent.com';
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
  onGoogleSignInSuccess(event: GoogleSignInSuccess) {
    let googleUser: gapi.auth2.GoogleUser = event.googleUser;
    let id: string = googleUser.getId();
    let profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
    console.log('ID: ' +profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    var id_token = googleUser.getAuthResponse().id_token;

    this.dataservice.postlogin(id_token).subscribe(resp => {
      console.log(resp.status);
      /*if(resp. =="SUCCESS"){
        this.route.navigate(['/start']);
      }
      */
    });

  }

}
