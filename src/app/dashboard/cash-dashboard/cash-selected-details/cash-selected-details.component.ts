import { Component, OnInit } from '@angular/core';
import { CashDashboardService } from '@app/dashboard/cash-dashboard/cash-dashboard.service';
import { Router } from '@angular/router';
import { CashService } from '@app/_services/cash.service';

@Component({
    selector: 'app-cash-selected-details',
    templateUrl: './cash-selected-details.component.html',
    styleUrls: ['./cash-selected-details.component.scss'],
})
export class CashSelectedDetailsComponent implements OnInit {
    constructor(public cashDashboardService: CashDashboardService, private cashService: CashService, public router: Router) {}

    ngOnInit(): void {
        this.cashDashboardService.editMode.next(false);
    }

    add() {
        this.router.navigate(['cash-dashboard/manage', { outlets: { left: 'grid', right: 'add' } }]);
    }

    update() {
        this.router.navigate(['cash-dashboard/manage', { outlets: { left: 'grid', right: 'update' } }]);
    }

    delete() {
        this.cashService.deleteLegacy(this.cashDashboardService.selectedTransaction.id).subscribe((result) => {
            this.cashDashboardService.selectedTransaction = null;
            this.cashDashboardService.load(this.cashDashboardService.date);
        });
    }
}
