import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// used to create fake backend
import { ErrorInterceptor, JwtInterceptor } from './_helpers';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent } from './_components';
import { DashboardComponent } from './dashboard';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { RepairService } from '@app/_services/repair.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainHeaderComponent } from '@app/_components/main-header/main-header.component';
import { FooterComponent } from './_components/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { ProgressLoaderModule } from '@app/_components/progress-loader/progress-loader.module';
import { ProgressLoaderService } from '@app/_components/progress-loader/progress-loader.service';
import { LoginModule } from '@app/login/login.module';
import { RegisterModule } from '@app/register/register.module';

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
    ],
    declarations: [AlertComponent, AppComponent, FooterComponent, MainHeaderComponent, DashboardComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        ProgressLoaderService,
        RepairService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
