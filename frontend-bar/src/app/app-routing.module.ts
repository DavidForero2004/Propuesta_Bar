import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { LoginComponent } from './components/user/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EventComponent } from './components/event/event.component';
import { ListComponent } from './components/user/list/list.component';
import { AuthGuard } from './utils/auth.guard';

const routes: Routes = [{
  path: '', children: [
    //USERS
    {path: 'login', component: LoginComponent},
    {path: 'users', component: ListComponent, canActivate: [AuthGuard]},
    {path: 'dashboard', component: DashboardComponent},
    ///EVENTS
    {path: 'event', component: EventComponent},
    //ERRORS
    {path: '**', redirectTo: 'login', pathMatch: 'full'}

  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
