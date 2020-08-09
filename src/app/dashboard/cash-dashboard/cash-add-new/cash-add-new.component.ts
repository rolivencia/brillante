import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CashDashboardService } from '@app/dashboard/cash-dashboard/cash-dashboard.service';
import { CashFormHandlerService } from '@app/dashboard/cash-dashboard/cash-form-handler.service';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { formatDate } from '@angular/common';
import { AuthenticationService } from '@app/_services';
import { User } from '@app/_models';
import * as moment from 'moment';

@Component({
    selector: 'app-cash-add-new',
    templateUrl: './cash-add-new.component.html',
    styleUrls: ['./cash-add-new.component.scss'],
})
export class CashAddNewComponent implements AfterViewInit, OnDestroy, OnInit {
    public currentDateTime: string;
    public currentUser: User;

    constructor(
        public cashDashboardService: CashDashboardService,
        public cashFormHandlerService: CashFormHandlerService,
        private router: Router,
        public authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe((x) => (this.currentUser = x));
    }

    ngOnInit(): void {
        this.cashDashboardService.editMode.next(true);
    }

    ngAfterViewInit() {
        interval(1000).subscribe((result) => {
            this.currentDateTime = formatDate(new Date(), 'dd-MM-yyyy HH:mm', 'en-US', '-0300');
        });
    }

    ngOnDestroy(): void {
        this.cashDashboardService.editMode.next(false);
    }

    public async create() {
        const result = await this.cashFormHandlerService.create();
        if (result) {
            this.cashDashboardService.date = moment();
            this.cashDashboardService.load(this.cashDashboardService.date);
            this.router.navigate(['cash-dashboard/manage', { outlets: { left: 'grid', right: 'selected' } }]);
        }
    }

    details() {
        this.router.navigate(['cash-dashboard/manage', { outlets: { left: 'grid', right: 'selected' } }]);
    }
}
