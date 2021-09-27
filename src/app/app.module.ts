﻿import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// used to create fake backend
import { ErrorInterceptor, JwtInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { DashboardComponent } from './dashboard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainHeaderComponent } from '@app/_components/main-header/main-header.component';
import { FooterComponent } from './_components/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { ProgressLoaderModule } from '@app/_components/progress-loader/progress-loader.module';
import { ProgressLoaderService } from '@app/_components/progress-loader/progress-loader.service';
import { LoginModule } from '@app/login/login.module';
import { RegisterModule } from '@app/register/register.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LoginModule,
        RegisterModule,
        routing,
        ToastrModule.forRoot(),
        ProgressLoaderModule,
        FontAwesomeModule,
    ],
    declarations: [AppComponent, FooterComponent, MainHeaderComponent, DashboardComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        ProgressLoaderService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
