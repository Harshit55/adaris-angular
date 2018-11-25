import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { ExamPageComponent } from './exam-page/exam-page.component';
import {ResultPageComponent} from './result-page/result-page.component'
import { StartPageComponent } from './start-page/start-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ExamlistPageComponent } from './examlist-page/examlist-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ErrorPageComponent } from './error-page/error-page.component';
import {GoogleSignInComponent} from 'angular-google-signin';


@NgModule({
  declarations: [
    AppComponent,
    ExamPageComponent,
    StartPageComponent,
    ResultPageComponent,
    LoginPageComponent,
    ExamlistPageComponent,
    ErrorPageComponent,
    GoogleSignInComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
