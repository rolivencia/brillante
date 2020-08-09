import { CashDashboardService } from '@app/dashboard/cash-dashboard/cash-dashboard.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CashFormHandlerService } from '@app/dashboard/cash-dashboard/cash-form-handler.service';
import { LegacyMapperService } from '@app/_services/legacy-mapper.service';

@Component({
    selector: 'app-cash-update',
    templateUrl: './cash-update.component.html',
    styleUrls: ['./cash-update.component.scss'],
})
export class CashUpdateComponent implements OnDestroy, OnInit {
    public controlsLoaded = false;

    constructor(
        public cashDashboardService: CashDashboardService,
        public cashFormHandlerService: CashFormHandlerService,
        private legacyMapperService: LegacyMapperService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.cashDashboardService.editMode.next(true);
        this.cashFormHandlerService.controlsLoaded.subscribe((result) => {
            if (result) {
                const legacyCashTransaction = this.route.snapshot.data['legacyCashTransaction'];
                if (legacyCashTransaction) {
                    this.cashFormHandlerService.saved = false;
                    this.cashFormHandlerService.cashTransaction = this.legacyMapperService.fromLegacyCashTransaction(legacyCashTransaction);
                    this.cashFormHandlerService.formGroup = this.cashFormHandlerService.load();
                    this.cashFormHandlerService.patch();
                    this.controlsLoaded = true;
                }
            }
        });
    }

    ngOnDestroy(): void {
        this.cashDashboardService.editMode.next(false);
    }

    save() {}

    details() {
        this.router.navigate(['cash-dashboard/manage', { outlets: { left: 'grid', right: 'selected' } }]);
    }

    log(event) {
        console.log(cashFormHandlerService.transactionParentConcept);
    }
}
