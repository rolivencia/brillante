import { CashDashboardService } from '@pages/cash-dashboard/cash-dashboard.service';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EUserRole } from '@enums/user.enum';
import { AuthenticationService, hasRoles } from '@services/authentication.service';
import { DateTimeService } from '@services/date-time.service';

@Component({
    selector: 'app-cash-dashboard',
    templateUrl: './cash-dashboard.component.html',
    styleUrls: ['./cash-dashboard.component.scss'],
    standalone: false,
})
export class CashDashboardComponent implements OnInit {
    editMode: boolean;
    displayManagementHeader: boolean = false;

    private dateTimeService = inject(DateTimeService);

    constructor(
        public authenticationService: AuthenticationService,
        public cashDashboardService: CashDashboardService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.cashDashboardService.ngbDateFrom = this.dateTimeService.formatDateToObject(this.cashDashboardService.date);
        this.cashDashboardService.ngbDateTo = this.dateTimeService.formatDateToObject(this.cashDashboardService.date);

        this.cashDashboardService.editMode.subscribe((value) => {
            this.editMode = value;
        });

        this.authenticationService.currentUser.subscribe((user) => {
            this.displayManagementHeader = hasRoles(user.roles, [
                EUserRole.ADMIN,
                EUserRole.OWNER,
                EUserRole.COUNTER_CLERK,
                EUserRole.ACCOUNTANT,
            ]);
        });
    }

    public navigateTo(top = null, left = null, right = null) {
        this.router.navigate(['cash-dashboard/manage', { outlets: { top: top, left: left, right: right } }]);
    }
}
