import { Component, OnInit } from '@angular/core';
import {fadeInAnimation} from '../Fade';
import {Router} from '@angular/router';
import {DataTransferService} from '../data-transfer.service';
import {SocialaccountService} from '../socialaccount.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css'],
  animations:[fadeInAnimation]
})
export class StartPageComponent implements OnInit {

  constructor(private router:Router,private datatransfer:DataTransferService,private socialService:SocialaccountService) { }
  time:string="";
  que_num:string="";
  isOpen=true;
  ngOnInit() {
    this.time=this.datatransfer.getTime();
    this.que_num=this.datatransfer.getTotal();
    if(this.time.length<=0 || !this.socialService.loggedIn) this.router.navigate(['/examlist']);
  }
  OnStartClick(){
    this.toggle();

  }
  toggle(){
    this.isOpen=!this.isOpen;
    this.router.navigate(['/exam']);
  }
}
