import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor, JwtInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ProgressLoaderModule } from '@components/progress-loader/progress-loader.module';
import { ProgressLoaderService } from '@components/progress-loader/progress-loader.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { OfficeBranchService } from '@services/office-branch.service';
import { MainHeaderModule } from '@components/main-header/main-header.module';
import { PaymentMethodsService } from '@services/payment-methods.service';
import { RepairService } from '@services/repair.service';
import { CartService } from '@services/cart.service';
import { NavigationService } from '@services/navigation.service';
import { LeftSidebarModule } from '@components/left-sidebar/left-sidebar.module';
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LayoutService } from '@services/layout.service';
import { AggregateService, ExcelExportService, FilterService, SortService } from '@syncfusion/ej2-angular-grids';

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
        MainHeaderModule,
        LeftSidebarModule,
        SidebarModule,
    ],
    declarations: [AppComponent],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: (cartService: CartService) => () => cartService.loadFromStorage(),
            deps: [CartService],
            multi: true,
        },
        {
            provide: APP_INITIALIZER,
            useFactory: (officeBranchService: OfficeBranchService) => () => officeBranchService.load(),
            deps: [OfficeBranchService],
            multi: true,
        },
        {
            provide: APP_INITIALIZER,
            useFactory: (paymentMethodsService: PaymentMethodsService) => () => paymentMethodsService.load(),
            deps: [PaymentMethodsService],
            multi: true,
        },

        {
            provide: APP_INITIALIZER,
            useFactory: (repairService: RepairService) => () => repairService.load(),
            deps: [RepairService],
            multi: true,
        },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        CartService,
        DeviceDetectorService,
        AggregateService,
        ExcelExportService,
        FilterService,
        LayoutService,
        OfficeBranchService,
        NavigationService,
        ProgressLoaderService,
        SortService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
