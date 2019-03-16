import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { ExamPageComponent } from './exam-page/exam-page.component';
import {ResultPageComponent} from './result-page/result-page.component';
import { StartPageComponent } from './start-page/start-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ExamlistPageComponent } from './examlist-page/examlist-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SocialLoginModule } from 'angularx-social-login';
import { AuthServiceConfig, GoogleLoginProvider} from 'angularx-social-login';
import { SidebarModule } from 'ng-sidebar';
import {TabModule} from 'angular-tabs-component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import { GoogleloginComponent } from './googlelogin/googlelogin.component';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('819187862405-7bf2235rg12mf5c3udkoicln86t0ed19.apps.googleusercontent.com')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    ExamPageComponent,
    StartPageComponent,
    ResultPageComponent,
    LoginPageComponent,
    ExamlistPageComponent,
    ErrorPageComponent,
    GoogleloginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    SidebarModule,
    TabModule,
    MatTabsModule,
    MatMenuModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
