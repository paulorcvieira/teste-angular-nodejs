import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './pages/sessions/login-page/login-page.component';
import { SignupPageComponent } from './pages/sessions/signup-page/signup-page.component';

import { ViewTaskComponent } from './pages/tasks/view-task/view-task.component';
import { NewListComponent } from './pages/tasks/new-list/new-list.component';
import { NewTaskComponent } from './pages/tasks/new-task/new-task.component';
import { EditListComponent } from './pages/tasks/edit-list/edit-list.component';
import { EditTaskComponent } from './pages/tasks/edit-task/edit-task.component';

import { ViewUserComponent } from './pages/users/view-user/view-user.component';
import { NewUserComponent } from './pages/users/new-user/new-user.component';
import { AggregateComponent } from './pages/users/aggregate/aggregate.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },

  { path: '', redirectTo: '/lists', pathMatch: 'full' },
  { path: 'new-list', component: NewListComponent },
  { path: 'edit-list/:listId', component: EditListComponent },
  { path: 'lists', component: ViewTaskComponent },
  { path: 'lists/:listId', component: ViewTaskComponent },
  { path: 'lists/:listId/new-task', component: NewTaskComponent },
  { path: 'lists/:listId/edit-task/:taskId', component: EditTaskComponent },

  { path: 'users', component: ViewUserComponent },
  { path: 'users/:userId', component: ViewUserComponent },
  { path: 'new-user', component: NewUserComponent },
  { path: 'aggregate', component: AggregateComponent },

  { path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
