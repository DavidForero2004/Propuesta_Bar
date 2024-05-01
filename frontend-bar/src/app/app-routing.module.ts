import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { LoginComponent } from './components/user/login/login.component';
import { AuthGuard } from './utils/auth.guard';
import { StructureComponent } from './components/landing/structure/structure.component';
import { ListUserComponent } from './components/user/list-user/list-user.component';
import { ListEventComponent } from './components/event/list-event/list-event.component';
import { ListRolComponent } from './components/rol/list-rol/list-rol.component';
import { ListStatusComponent } from './components/status/list-status/list-status.component';

const routes: Routes = [{
  path: '', children: [
    //USERS
    {path: 'login', component: LoginComponent},
    {path: 'users', component: ListUserComponent, canActivate: [AuthGuard]},
    ///EVENTS
    {path: 'events', component: ListEventComponent, canActivate: [AuthGuard]},
    //LANDING
    {path: 'hollowbar-initial/client', component: StructureComponent},
    //ROLS
    {path: 'rols', component: ListRolComponent, canActivate: [AuthGuard]},
    //STATUS
    {path: 'status', component: ListStatusComponent, canActivate: [AuthGuard]},
    //ERRORS
    {path: '**', redirectTo: 'login', pathMatch: 'full'}

  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
