import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { LoginComponent } from './components/user/login/login.component';
import { ListEventComponent } from './components/event/list-event/list-event.component';
import { ListComponent } from './components/user/list/list.component';
import { AuthGuard } from './utils/auth.guard';
import { InsertEventComponent } from './components/event/insert-event/insert-event.component';
import { StructureComponent } from './components/landing/structure/structure.component';

const routes: Routes = [{
  path: '', children: [
    //USERS
    {path: 'login', component: LoginComponent},
    {path: 'users', component: ListComponent, canActivate: [AuthGuard]},
    ///EVENTS
    {path: 'event', component: ListEventComponent, canActivate: [AuthGuard]},
    {path: 'event/insert', component: InsertEventComponent, canActivate: [AuthGuard]},
    //LANDING
    {path: 'HollowBar-initial/client', component: StructureComponent},
    //ERRORS
    {path: '**', redirectTo: 'login', pathMatch: 'full'}

  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
