import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Moduls
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http'; // Cambia la importación
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'
import { ToastrModule } from 'ngx-toastr';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AddTokenInterceptor } from './utils/add-token.interceptor';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

//Components
import { LoginComponent } from './components/user/login/login.component';
import { ListComponent } from './components/user/list/list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListEventComponent } from './components/event/list-event/list-event.component';
import { InsertEventComponent } from './components/event/insert-event/insert-event.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LandNavComponent } from './components/landing/land-nav/land-nav.component';
import { FooterComponent } from './components/landing/footer/footer.component';
import { StructureComponent } from './components/landing/structure/structure.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FullCalendarModule } from '@fullcalendar/angular';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListComponent,
    NavbarComponent,
    ListEventComponent,
    InsertEventComponent,
    LandNavComponent,
    FooterComponent,
    StructureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({ cookieName: 'XSRF-TOKEN' }), // Agrega HttpClientXsrfModule
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3500,
      preventDuplicates: true,
      progressBar: true,
      tapToDismiss: true
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FontAwesomeModule,
    FullCalendarModule
  ],
  providers: [
    // No se necesita provideHttpClient
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
