import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// used to create fake backend
import { ErrorInterceptor, JwtInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { DashboardComponent } from '@management-view/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainHeaderComponent } from '@components/main-header/main-header.component';
import { ToastrModule } from 'ngx-toastr';
import { ProgressLoaderModule } from '@components/progress-loader/progress-loader.module';
import { ProgressLoaderService } from '@components/progress-loader/progress-loader.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { OfficeBranchService } from '@services/office-branch.service';

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
    declarations: [AppComponent, MainHeaderComponent, DashboardComponent],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: (officeBranchService: OfficeBranchService) => () => officeBranchService.load(),
            deps: [OfficeBranchService],
            multi: true,
        },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        OfficeBranchService,
        ProgressLoaderService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
