import { CashDashboardService } from '@app/dashboard/cash-dashboard/cash-dashboard.service';
import { CashService } from '@app/_services/cash.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Operation } from '@app/_models/cash-transaction';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-cash-selected-details',
    templateUrl: './cash-selected-details.component.html',
    styleUrls: ['./cash-selected-details.component.scss'],
})
export class CashSelectedDetailsComponent implements OnInit, OnDestroy {
    constructor(
        public cashDashboardService: CashDashboardService,
        private cashService: CashService,
        public router: Router,
        private toastrService: ToastrService
    ) {}

    ngOnInit(): void {
        this.cashDashboardService.editMode.next(false);
        this.cashDashboardService.selectedTransaction = null;
    }

    ngOnDestroy() {
        this.cashDashboardService.selectedTransaction = null;
    }

    add() {
        this.router.navigate(['cash-dashboard/manage', { outlets: { left: 'grid', right: 'add' } }]);
    }

    update(id: number | string) {
        this.router.navigate(['cash-dashboard/manage', { outlets: { left: 'grid', right: 'update/' + id } }]);
    }

    delete() {
        const toDeleteId = this.cashDashboardService.selectedTransaction.id;
        this.cashService.deleteLegacy(toDeleteId).subscribe((result) => {
            this.toastrService.info(`Transacción de ID ${toDeleteId} eliminada correctamente.`);
            this.cashDashboardService.selectedTransaction = null;
            this.cashDashboardService.load(this.cashDashboardService.date);
        });
    }

    navigate() {
        // TODO: Posibilitar navegación a ventas cuando se implemente el módulo correspondiente
        const operation: Operation = this.cashDashboardService.selectedTransaction.operation;
        switch (operation.description) {
            case 'Reparación':
                this.router.navigate(['repair-dashboard/manage', { outlets: { top: 'update/' + operation.id, left: null, right: null } }]);
                break;
            default:
                break;
        }
    }
}
