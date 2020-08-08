import { CashDashboardService } from '@app/dashboard/cash-dashboard/cash-dashboard.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CashFormHandlerService } from '@app/dashboard/cash-dashboard/cash-form-handler.service';

@Component({
    selector: 'app-cash-update',
    templateUrl: './cash-update.component.html',
    styleUrls: ['./cash-update.component.scss'],
})
export class CashUpdateComponent implements OnDestroy, OnInit {
    constructor(
        public cashDashboardService: CashDashboardService,
        public cashFormHandlerService: CashFormHandlerService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.cashDashboardService.editMode.next(true);
    }

    ngOnDestroy(): void {
        this.cashDashboardService.editMode.next(false);
    }

    save() {}

    details() {
        this.router.navigate(['cash-dashboard/manage', { outlets: { left: 'grid', right: 'selected' } }]);
    }
}
