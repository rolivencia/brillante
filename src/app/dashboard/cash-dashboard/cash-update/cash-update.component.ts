import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { CashDashboardService } from '@app/dashboard/cash-dashboard/cash-dashboard.service';
import { CashFormHandlerService } from '@app/dashboard/cash-dashboard/cash-form-handler.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LegacyMapperService } from '@app/_services/legacy-mapper.service';

@Component({
    selector: 'app-cash-update',
    templateUrl: './cash-update.component.html',
    styleUrls: ['./cash-update.component.scss'],
})
export class CashUpdateComponent implements OnDestroy, OnInit {
    public controlsLoaded = false;
    public dateTime: Date;

    constructor(
        public cashDashboardService: CashDashboardService,
        public cashFormHandler: CashFormHandlerService,
        private legacyMapperService: LegacyMapperService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.cashDashboardService.editMode.next(true);
        this.cashFormHandler.controlsLoaded.subscribe((result) => {
            if (result) {
                const legacyCashTransaction = this.route.snapshot.data['legacyCashTransaction'];
                if (legacyCashTransaction) {
                    this.cashFormHandler.saved = false;
                    this.cashFormHandler.cashTransaction = this.legacyMapperService.fromLegacyCashTransaction(
                        legacyCashTransaction,
                        this.cashFormHandler.transactionConcepts
                    );

                    // Assign parent transaction concept for usage in the update form
                    this.cashFormHandler.transactionParentConcept = this.cashFormHandler.selectableTransactionConcepts.filter(
                        (concept) => this.cashFormHandler.cashTransaction.concept.parent.id === concept.id
                    )[0];

                    // Assign date
                    this.dateTime = this.cashFormHandler.cashTransaction.date.toDate();

                    this.cashFormHandler.formGroup = this.cashFormHandler.load();
                    this.cashFormHandler.patch();
                    this.controlsLoaded = true;
                }
            }
        });
    }

    ngOnDestroy(): void {
        this.cashDashboardService.editMode.next(false);
    }

    async update() {
        this.cashFormHandler.cashTransaction.date = moment(this.dateTime);
        this.cashFormHandler.formGroup.patchValue({ date: moment(this.dateTime) });
        const result = await this.cashFormHandler.update();
        if (result) {
            this.cashDashboardService.load(this.cashDashboardService.date);
            this.router.navigate(['cash-dashboard/manage', { outlets: { left: 'grid', right: 'selected' } }]);
        }
    }

    details() {
        this.router.navigate(['cash-dashboard/manage', { outlets: { left: 'grid', right: 'selected' } }]);
    }
}
