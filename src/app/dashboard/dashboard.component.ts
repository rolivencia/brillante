﻿import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService, AlertService } from '@app/_services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-main-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];

    constructor(
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    deleteUser(id: number) {
        this.userService
            .delete(id)
            .pipe(first())
            .subscribe(() => {
                this.loadAllUsers();
            });
    }

    private loadAllUsers() {
        this.userService
            .getAll()
            .pipe(first())
            .subscribe(users => {
                this.users = users;
            });
    }

    goTo(route: string) {
        this.router.navigate([`/${route}`]);
    }

    goToRepair() {
        this.router
            .navigate(['repair-dashboard/manage', { outlets: { left: 'grid', right: 'selected' } }])
            .then(result => console.log(result));
    }

    goToCash() {
        this.router.navigate(['cash-dashboard']).then(result => console.log(result));
    }

    goToLegacyCash() {
        window.open('http://brillante.brillantestore.com/cash-vista-de-gestion/', '_blank');
    }

    goToLegacyStock() {
        window.open('http://brillante.brillantestore.com/stock-vista-de-gestion/', '_blank');
    }

    notImplemented(route: string) {
        this.alertService.error('Módulo no implementado.', true);
    }
}
