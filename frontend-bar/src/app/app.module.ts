import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Moduls
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'
import { ToastrModule } from 'ngx-toastr';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

//Components
import { LoginComponent } from './components/user/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListComponent } from './components/user/list/list.component';
import { AddTokenInterceptor } from './utils/add-token.interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListEventComponent } from './components/event/list-event/list-event.component';
import { InsertEventComponent } from './components/event/insert-event/insert-event.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ListComponent,
    NavbarComponent,
    ListEventComponent,
    InsertEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3500,
      preventDuplicates: true,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    provideClientHydration(),
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
