import { Component, OnDestroy, OnInit } from '@angular/core';
import { CashDashboardService } from '@app/dashboard/cash-dashboard/cash-dashboard.service';
import { CashFormHandlerService } from '@app/dashboard/cash-dashboard/cash-form-handler.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cash-add-new',
    templateUrl: './cash-add-new.component.html',
    styleUrls: ['./cash-add-new.component.scss'],
})
export class CashAddNewComponent implements OnDestroy, OnInit {
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
