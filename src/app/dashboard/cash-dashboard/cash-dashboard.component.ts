import { CashDashboardService } from '@app/dashboard/cash-dashboard/cash-dashboard.service';
import { CashFormHandlerService } from '@app/dashboard/cash-dashboard/cash-form-handler.service';
import { Component, OnInit } from '@angular/core';
import { DateHandlerService } from '@app/_services/date-handler.service';
import { Router } from '@angular/router';
import { AuthenticationService, hasRoles } from '@app/_services';
import { EUser } from '@app/_enums/user.enum';
import { Role } from '@app/_models';

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
        this.cashFormHandlerService.formGroup = this.cashFormHandlerService.load();

        this.cashDashboardService.editMode.subscribe((value) => {
            this.editMode = value;
        });

        this.authenticationService.currentUser.subscribe((user) => {
            this.displayManagementHeader = hasRoles(user.roles, [EUser.ADMIN, EUser.OWNER, EUser.COUNTER_CLERK]);
        });
    }

    public navigateTo(top = null, left = null, right = null) {
        this.router.navigate(['cash-dashboard/manage', { outlets: { top: top, left: left, right: right } }]);
    }
}
