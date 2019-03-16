import { Injectable } from '@angular/core';
import { AuthService ,SocialUser} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { BehaviorSubject } from 'rxjs';
import { DataService } from './data.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SocialaccountService {

  user:SocialUser;
  userName:string="";
  userImageURL:string="";
  id_token:string="";
  component:string="";
  loggedInmsg = new BehaviorSubject(false);
  loggedIn = this.loggedInmsg.asObservable();
  constructor(private router:Router,private authService: AuthService,private dataservice:DataService) { this.startUser();}

  startUser(){
  this.authService.authState.subscribe((user) => {
      this.user = user;
      if(this.user!=null){
      this.id_token = user.idToken;
      this.userName=user.firstName;
      this.userImageURL=user.photoUrl;
      this.updatedloginstate(true);
      this.sendtokenid(this.id_token,"login");
      }
    });
  }
  setComponent(component:string){
    this.component=component;
  }
  getComponent(){
    return this.component;
  }
  sendtokenid(token:string,loginstate:string){
    this.dataservice.postlogin(token,loginstate).subscribe(resp => {},error=>{
      this.router.navigate(['/error']);
    });
  }
  getGoogleName(){
    return this.userName;
  }
  getGoogleImageURL(){
    return this.userImageURL;
  }
  getGoogleIDtoken(){
    return this.id_token;
  }
  getGoogleLoginStatus(){
    return this.loggedIn;
  }
  updatedloginstate(data: boolean){
    this.loggedInmsg.next(data);
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (userData) => { //on success
         //this will return user data from google. What you need is a user token which you will send it to the server
         this.updatedloginstate(true);
      }
    );
  };
  signOutOfGoogle(): void{
    this.authService.signOut().then(
      (userData) => {
      this.updatedloginstate(false);
      this.sendtokenid(this.id_token,"logout");
      }
    );
  }
}
