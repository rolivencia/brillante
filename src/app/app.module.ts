import { NgModule, inject, provideAppInitializer } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ProgressLoaderModule } from '@components/progress-loader/progress-loader.module';
import { ProgressLoaderService } from '@components/progress-loader/progress-loader.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
import { DateTimeService } from '@services/date-time.service';
import { AuthModule, authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';
import { environment } from '@environments/environment';
import { errorInterceptor, jwtInterceptor } from '@app/_helpers';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
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
        provideAppInitializer(() => {
            const initializerFn = ((cartService: CartService) => () => cartService.loadFromStorage())(
                inject(CartService)
            );
            return initializerFn();
        }),
        provideAppInitializer(() => {
            const initializerFn = ((officeBranchService: OfficeBranchService) => () => officeBranchService.load())(
                inject(OfficeBranchService)
            );
            return initializerFn();
        }),
        provideAppInitializer(() => {
            const initializerFn = ((paymentMethodsService: PaymentMethodsService) => () =>
                paymentMethodsService.load())(inject(PaymentMethodsService));
            return initializerFn();
        }),

        provideAppInitializer(() => {
            const initializerFn = ((repairService: RepairService) => () => repairService.load())(inject(RepairService));
            return initializerFn();
        }),
        provideAuth0({
            domain: environment.auth0.domain,
            clientId: environment.auth0.clientId,
            authorizationParams: {
                redirect_uri: environment.auth0.authorizationParams.redirect_uri,
                audience: environment.auth0.authorizationParams.audience,
            },
            cacheLocation: 'localstorage',
            httpInterceptor: {
                allowedList: [
                    {
                        uri: `${environment.auth0.authorizationParams.audience}/*`,
                        tokenOptions: {
                            authorizationParams: {
                                audience: environment.auth0.authorizationParams.audience,
                                scope: 'read:current_user',
                            },
                        },
                    },
                ],
            },
        }),
        provideHttpClient(withInterceptors([authHttpInterceptorFn, jwtInterceptor, errorInterceptor])),
        CartService,
        DateTimeService,
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
