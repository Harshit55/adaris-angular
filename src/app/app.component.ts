import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  quiz = 'Quiz-SBI';
  hour=0;
  min=20;
  sec=0;
  public timer="go";

  constructor(){
  }

}
