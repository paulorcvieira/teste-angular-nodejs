import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WebReqInterceptor } from './utils/web-req.interceptor';

import { SignupPageComponent } from './pages/sessions/signup-page/signup-page.component';
import { LoginPageComponent } from './pages/sessions/login-page/login-page.component';

import { ViewTaskComponent } from './pages/tasks/view-task/view-task.component';
import { NewListComponent } from './pages/tasks/new-list/new-list.component';
import { NewTaskComponent } from './pages/tasks/new-task/new-task.component';
import { EditListComponent } from './pages/tasks/edit-list/edit-list.component';
import { EditTaskComponent } from './pages/tasks/edit-task/edit-task.component';

import { ViewUserComponent } from './pages/users/view-user/view-user.component';
import { NewUserComponent } from './pages/users/new-user/new-user.component';
import { AggregateComponent } from './pages/users/aggregate/aggregate.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewTaskComponent,
    NewListComponent,
    NewTaskComponent,
    LoginPageComponent,
    SignupPageComponent,
    EditListComponent,
    EditTaskComponent,
    ViewUserComponent,
    NewUserComponent,
    AggregateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WebReqInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
