import { Component, OnInit } from '@angular/core';
import { CashDashboardService } from '@app/dashboard/cash-dashboard/cash-dashboard.service';
import { Router } from '@angular/router';
import { CashService } from '@app/_services/cash.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-cash-selected-details',
    templateUrl: './cash-selected-details.component.html',
    styleUrls: ['./cash-selected-details.component.scss'],
})
export class CashSelectedDetailsComponent implements OnInit {
    constructor(
        public cashDashboardService: CashDashboardService,
        private cashService: CashService,
        public router: Router,
        private toastrService: ToastrService
    ) {}

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
        const toDeleteId = this.cashDashboardService.selectedTransaction.id;
        this.cashService.deleteLegacy(toDeleteId).subscribe((result) => {
            this.toastrService.info(`Transacción de ID ${toDeleteId} eliminada correctamente.`);
            this.cashDashboardService.selectedTransaction = null;
            this.cashDashboardService.load(this.cashDashboardService.date);
        });
    }
}
