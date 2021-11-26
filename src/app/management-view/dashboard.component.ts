import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OfficeBranchService } from '@services/office-branch.service';
import { User } from '@models/user';
import { AlertService } from '@services/alert.service';
import { AuthenticationService } from '@services/authentication.service';

@Component({
    selector: 'app-main-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
    public currentUser: User;
    public currentUserSubscription: Subscription;
    constructor(
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
        public officeBranchService: OfficeBranchService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe((user) => {
            this.currentUser = user;
        });
    }

    ngOnInit() {}

    ngOnDestroy(): void {
        this.currentUserSubscription.unsubscribe();
    }

    goTo(route: string) {
        this.router.navigate([`/${route}`]);
    }

    goToRepair() {
        this.router
            .navigate(['repair-dashboard/manage', { outlets: { left: 'grid', right: 'selected' } }])
            .then((result) => console.log(result));
    }

    goToCash() {
        this.router
            .navigate(['cash-dashboard/manage', { outlets: { left: 'grid', right: 'selected' } }])
            .then((result) => console.log(result));
    }

    openSanityStudio() {
        window.open('https://brillante-store.sanity.studio/', '_blank');
    }

    notImplemented() {
        this.alertService.error('Módulo no implementado.', true);
    }
}
