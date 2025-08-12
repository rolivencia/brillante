import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
    NavigationCancel,
    NavigationEnd,
    NavigationError,
    NavigationStart,
    ResolveEnd,
    ResolveStart,
    Router,
    RouterEvent,
} from '@angular/router';
import { ProgressLoaderService } from '@components/progress-loader/progress-loader.service';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '@services/authentication.service';
import { EUserRole } from '@enums/user.enum';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LayoutService } from '@services/layout.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-brillante',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
    @ViewChild('sidebar') sidebar: SidebarComponent;

    public sidebarOpen: boolean = false;
    public isDesktop: boolean = true;
    public isInternalUser: boolean = false;
    public isMainOutlerContainerized: boolean = true;

    constructor(
        private authenticationService: AuthenticationService,
        private deviceDetectorService: DeviceDetectorService,
        private layoutService: LayoutService,
        public progressLoaderService: ProgressLoaderService,
        private router: Router,
        private titleService: Title
    ) {
        this.progressBarHandler(this.router, this.progressLoaderService);
    }

    ngOnInit() {
        this.isDesktop = this.deviceDetectorService.isDesktop();
        this.layoutService.useContainer.subscribe((value) => {
            this.isMainOutlerContainerized = value;
        });
        this.authenticationService.currentUser.subscribe((user) => {
            this.isInternalUser = user && !user.roles.includes[EUserRole.CUSTOMER];
            if (this.isInternalUser) {
                this.titleService.setTitle('Brillante Store - Shine (Sistema de Gestión)');
            } else {
                this.titleService.setTitle('Brillante Store');
            }
        });

        this.authenticationService.login().subscribe((loggedUser) => {
            this.authenticationService.currentUser.next(loggedUser);
        });
    }

    ngAfterViewInit() {
        const sidebarStatus: boolean = JSON.parse(localStorage.getItem('sidebarOpen'));
        if (sidebarStatus) {
            this.onToggleSidebar(sidebarStatus);
        }
    }

    /**
     * Subscribes to router events, in order to show and hide loading indicator
     * @param router - Angular core router service
     * @param progressLoaderService the progress loader service
     */
    private progressBarHandler(router: Router, progressLoaderService: ProgressLoaderService): void {
        // Subscribing to router events, in order to show loading indicator
        router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
            // We don't show any progress loader in the login view
            switch (true) {
                case event instanceof NavigationStart:
                case event instanceof ResolveStart: {
                    progressLoaderService.show();
                    break;
                }
                case event instanceof NavigationEnd:
                case event instanceof NavigationCancel:
                case event instanceof NavigationError:
                case event instanceof ResolveEnd: {
                    this.layoutService.useContainer.next(true);
                    progressLoaderService.hide();
                    break;
                }
                default: {
                    break;
                }
            }
        });
    }

    isLoggingIn(): boolean {
        return this.router.url === '/login';
    }

    public onToggleSidebar(event) {
        this.sidebarOpen = event;
        this.sidebarOpen ? this.sidebar.show() : this.sidebar.hide();
        localStorage.setItem('sidebarOpen', this.sidebarOpen.toString());
    }

    public onCreated() {
        this.sidebar.element.style.visibility = '';
    }

    public onSidebarClose() {
        this.sidebarOpen = false;
    }

    public onLogout(event) {
        this.isInternalUser = false;
        this.sidebarOpen = false;
    }

    public hideSidebar() {
        this.sidebar.hide();
    }
}
