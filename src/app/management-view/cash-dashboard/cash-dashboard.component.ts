import { CashDashboardService } from '@management-view/cash-dashboard/cash-dashboard.service';
import { CashFormHandlerService } from '@management-view/cash-dashboard/cash-form-handler.service';
import { Component, OnInit } from '@angular/core';
import { DateHandlerService } from '@services/date-handler.service';
import { Router } from '@angular/router';
import { EUserRole } from '@enums/user.enum';
import { AuthenticationService, hasRoles } from '@services/authentication.service';

@Component({
    selector: 'app-cash-dashboard',
    templateUrl: './cash-dashboard.component.html',
    styleUrls: ['./cash-dashboard.component.scss'],
})
export class CashDashboardComponent implements OnInit {
    editMode: boolean;
    displayManagementHeader: boolean = false;

    constructor(
        public authenticationService: AuthenticationService,
        public cashDashboardService: CashDashboardService,
        public cashFormHandlerService: CashFormHandlerService,
        private dateHandlerService: DateHandlerService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.cashDashboardService.ngbDateFrom = this.dateHandlerService.formatMomentToObject(
            this.cashDashboardService.date
        );
        this.cashDashboardService.ngbDateTo = this.dateHandlerService.formatMomentToObject(
            this.cashDashboardService.date
        );

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
