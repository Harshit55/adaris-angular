import { Component, OnInit } from '@angular/core';
import {fadeInAnimation} from '../Fade';
import {Router} from '@angular/router';
@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css'],
  animations:[fadeInAnimation]
})
export class StartPageComponent implements OnInit {

  constructor(private router:Router) { }
  isOpen=true;
  ngOnInit() {
  }
  OnStartClick(){
    this.toggle();

  }
  toggle(){
    this.isOpen=!this.isOpen;
    this.router.navigate(['/exam']);
  }
}
