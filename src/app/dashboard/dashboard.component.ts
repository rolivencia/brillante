import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, AuthenticationService, UserService } from '@app/_services';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { User } from '@app/_models';

@Component({
    selector: 'app-main-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
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
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe((user) => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    ngOnDestroy(): void {
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
            .subscribe((users) => {
                this.users = users;
            });
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
