import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import {StartPageComponent} from './start-page/start-page.component'
import {ExamPageComponent} from './exam-page/exam-page.component';
import {ResultPageComponent} from './result-page/result-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {ExamlistPageComponent} from './examlist-page/examlist-page.component';
import {ErrorPageComponent} from './error-page/error-page.component';

const routes: Routes =[
    {path:'', redirectTo: '/examlist', pathMatch:'full' },
    {path:'start',component: StartPageComponent},
    {path:'exam',component: ExamPageComponent},
    {path:'results',component: ResultPageComponent},
    {path:'login',component: LoginPageComponent},
    {path:'examlist',component: ExamlistPageComponent},
    {path:'error',component: ErrorPageComponent},
    {path:'**', redirectTo: '/start', pathMatch:'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}
export const routingComponents = [ExamPageComponent,ResultPageComponent,LoginPageComponent,ExamlistPageComponent]