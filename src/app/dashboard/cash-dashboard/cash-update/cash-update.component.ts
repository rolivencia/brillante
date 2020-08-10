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

                    // Assign parent transaction concept for usage in the update form
                    this.cashFormHandlerService.transactionParentConcept = this.cashFormHandlerService.transactionConcepts.filter(
                        (concept) => this.cashFormHandlerService.cashTransaction.concept.parent.id === concept.id
                    )[0];

                    // Assign date
                    this.dateTime = this.cashFormHandlerService.cashTransaction.date.toDate();

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

    update() {
        this.cashFormHandlerService.cashTransaction.date = moment(this.dateTime);
        this.cashFormHandlerService.formGroup.patchValue({ date: moment(this.dateTime) });
        const result = this.cashFormHandlerService.update();
        if (result) {
            this.cashDashboardService.load(this.cashDashboardService.date);
            this.router.navigate(['cash-dashboard/manage', { outlets: { left: 'grid', right: 'selected' } }]);
        }
    }

    details() {
        this.router.navigate(['cash-dashboard/manage', { outlets: { left: 'grid', right: 'selected' } }]);
    }
}
