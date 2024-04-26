import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { LoginComponent } from './components/user/login/login.component';
import { AuthGuard } from './utils/auth.guard';
import { StructureComponent } from './components/landing/structure/structure.component';
import { ListUserComponent } from './components/user/list-user/list-user.component';
import { ListEventComponent } from './components/event/list-event/list-event.component';

const routes: Routes = [{
  path: '', children: [
    //USERS
    {path: 'login', component: LoginComponent},
    {path: 'users', component: ListUserComponent, canActivate: [AuthGuard]},
    ///EVENTS
    {path: 'events', component: ListEventComponent, canActivate: [AuthGuard]},
    //LANDING
    {path: 'hollowbar-initial/client', component: StructureComponent},
    //ERRORS
    {path: '**', redirectTo: 'login', pathMatch: 'full'}

  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
