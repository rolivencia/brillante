import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, AuthenticationService, UserService } from '@app/_services';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '@app/_models';
import { OfficeBranchService } from '@app/_services/office-branch.service';

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

    notImplemented(route: string) {
        this.alertService.error('Módulo no implementado.', true);
    }
}
