import { AfterViewInit, Component, OnInit } from '@angular/core';
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

import * as wjcCore from '@grapecity/wijmo';
import { ProgressLoaderService } from '@app/_components/progress-loader/progress-loader.service';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '@app/_services';

wjcCore.setLicenseKey(
    '988775697861712#B05eulUMp9WMJh6T0VUS5BTQCF6RrcWWhRXSGp7Rp94RwVHUrkVM5UETUtSR6QkYZN7YvxWMXRlaOBXNqN5b9UkUhlHMR56YCBlN4N7ZykHbQJje6AVdrBlRZJld994NlRXVKZkTuhGSyF7LwUDe9gmWvJWcCtiTygVcxMVQF5mcYBDR6o7TJVmYQZGMnVUeMtkcQNEM0tESytkUWBje6VHRHdTRqh7YxRXazlles3CbmdkUxYmY6MVRUZlQjFGW0ZmYVBDOslTZ5Q4S9AnYK36TwR7d4kmMjJFc7UmThpHTHF4RWdzUXJiOiMlIsIiRzEjRzIjQiojIIJCL6gTN6QzN4kDO0IicfJye#4Xfd5nIzMEMCJiOiMkIsISZy36Qg2Wbql6ViojIOJyebpjIkJHUiwiI8AzN4QDMgETMyEDOxAjMiojI4J7QiwiIDxETgE6cl5EbhV7cpZlI0ISYONkIsIiMxcTM6gzN9YTN7cDO8kjI0ICZJJCL3JyM6hTMwIjI0IiclZnIsU6csFmZ0IiczRmI1pjIs9WQisnOiQkIsISP3EUTzglWslXd4YTWQtGdndjerEkZhdVW8dkY5B5UWx6Z4JEbW54bulnTxIFaWZkNHRnewJDeqZWWZdTU7d6aL36Q4tiWTFDTMhEOM3EWx3yRztGSIZVTtN5VxokNkB5Q6YHeEBHOltibl3EZ5RqQwR'
);

@Component({
    selector: 'app-brillante',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(
        private authenticationService: AuthenticationService,
        public progressLoaderService: ProgressLoaderService,
        private router: Router,
        private titleService: Title
    ) {
        this.progressBarHandler(this.router, this.progressLoaderService);
    }

    ngOnInit() {
        this.authenticationService.currentUser.subscribe((user) => {
            if (user && !user.roles.includes[5]) {
                this.titleService.setTitle('Brillante Store - Shine (Sistema de Gestión)');
            } else {
                this.titleService.setTitle('Brillante Store');
            }
        });
    }

    /**
     * Subscribes to router events, in order to show and hide loading indicator
     * @param router - Angular core router service
     * @param progressLoaderService the progress loader service
     */
    private progressBarHandler(router: Router, progressLoaderService: ProgressLoaderService): void {
        // Subscribing to router events, in order to show loading indicator
        router.events.subscribe((event: RouterEvent) => {
            // We don't show any progress loader in the login view
            switch (!this.isLoggingIn()) {
                case event instanceof NavigationStart:
                case event instanceof ResolveStart: {
                    progressLoaderService.show();
                    break;
                }
                case event instanceof NavigationEnd:
                case event instanceof NavigationCancel:
                case event instanceof NavigationError:
                case event instanceof ResolveEnd: {
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
}
