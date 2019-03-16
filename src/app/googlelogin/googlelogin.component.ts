import { Component, OnInit } from '@angular/core';
import { SocialaccountService} from '../socialaccount.service';
import { ApplicationStateServiceService} from '../application-state-service.service';

@Component({
  selector: 'app-googlelogin',
  templateUrl: './googlelogin.component.html',
  styleUrls: ['./googlelogin.component.css']
})
export class GoogleloginComponent implements OnInit {

  constructor(private socialservice:SocialaccountService,private screenstatus:ApplicationStateServiceService) { }
  isMobile:boolean=false;
  enablelogout:boolean=true;
  ngOnInit() {
    this.isMobile=this.screenstatus.getIsMobileResolution();
    this.getdrpdwnID();
  }
  getGoogle(num){
    if(num==0)return "url("+this.socialservice.getGoogleImageURL()+")";
    if(num==1)return this.socialservice.getGoogleName();
  }
  googleSignOut(){
    this.socialservice.signOutOfGoogle();
  }
  getdrpdwnID(){
    if(this.socialservice.getComponent()=="exam_page"){
      this.enablelogout=false;
    }
  }
}
