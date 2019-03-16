import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import {DataTransferService} from '../data-transfer.service';
import { fadeInAnimation } from '../Fade';
import { SocialUser } from 'angularx-social-login';
import { AuthService } from 'angularx-social-login';
import {SocialaccountService} from '../socialaccount.service';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';

export interface loginobj {
  mail: string,
  pwd: string
}
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  animations: [fadeInAnimation]
})
export class LoginPageComponent implements OnInit {
  isOpen = true;
  Username = "";
  Email = "";
  Password = "";
  signupele = "";
  loginstatus = "";
  loginsuccess = {
    status: ""
  };
  id_token="";
  logindata: loginobj = {
    mail: "",
    pwd: ""
  }
  user: SocialUser;
  private loggedIn: boolean;

  constructor(private authService: AuthService, private route: Router, private dataservice: DataService, private datatransferservice: DataTransferService,private soicalservice:SocialaccountService) { }
  ngOnInit() {
    this.loginstatus = "Sign Up";
    console.log(this.soicalservice.getGoogleName());
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.id_token = user.idToken;
      this.loggedIn = (user != null);
      if (this.loggedIn) {
        console.log("[init]Token-->"+this.id_token);
        console.log('logged');
        this.route.navigate(['/start']);
      }
    });
    this.datatransferservice.setGoogleAuth(this.authService);
  }
  updateusername(userName) {
    this.Username = userName;
    return this.Username;
  }

  updateemail(email) {
    this.Email = email;
    return this.Email;
  }

  updatepassword(password) {
    this.Password = password;
    return this.Password;
  }
  navigate() {
    this.route.navigate(['/start']);
  }
  OnLoginClick() {
    if (this.loginstatus == "Sign Up") {
      this.signupele = "none";
      this.loginstatus = "Login";
      localStorage.setItem("loginstate", "login");
    }
    else {
      this.logindata = {
        mail: this.Username,
        pwd: this.Password
      }
      this.toggle();
      this.dataservice.getlogin(this.logindata).subscribe(resp => {
        this.loginsuccess = resp;
        if (this.loginsuccess.status == "SUCCESS") { };
        this.navigate();
      });
      this.navigate();
    }
  }
  OnSignupClick() {
    if (this.loginstatus == "Login") {
      this.signupele = "";
      this.loginstatus = "Sign Up";
      localStorage.setItem("loginstate", "signup");
    }
  }
  toggle() {
    this.isOpen = !this.isOpen;
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (userData) => { //on success
         //this will return user data from google. What you need is a user token which you will send it to the server
      }
    );
  };

  signOut(): void {
    this.authService.signOut();
  }
}
