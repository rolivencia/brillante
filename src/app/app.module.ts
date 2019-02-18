import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
// used to create fake backend
import {ErrorInterceptor, JwtInterceptor} from './_helpers';

import {AppComponent} from './app.component';
import {routing} from './app.routing';

import {AlertComponent} from './_components';
import {ClientDashboardComponent} from './views/client-dashboard/client-dashboard.component';
import {HomeComponent} from './home';
import {LoginComponent} from './login';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RegisterComponent} from './register';
import {RepairDashboardComponent} from './views/repair-dashboard/repair-dashboard.component';
import {RepairService} from '@app/_services/repair.service';
import {WjGridFilterModule} from 'wijmo/wijmo.angular2.grid.filter';
import {WjGridModule} from 'wijmo/wijmo.angular2.grid';
import {WjInputModule} from 'wijmo/wijmo.angular2.input';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    WjInputModule,
    WjGridModule,
    WjGridFilterModule,
    routing
  ],
  declarations: [
    AlertComponent,
    AppComponent,
    ClientDashboardComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RepairDashboardComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    RepairService,

    // provider used to create fake backend
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
