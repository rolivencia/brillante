import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { CashDashboardService } from '@management-view/cash-dashboard/cash-dashboard.service';
import { CashFormHandlerService } from '@management-view/cash-dashboard/cash-form-handler.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CashTransactionConceptsService } from '@management-view/cash-dashboard/cash-transaction-concepts/cash-transaction-concepts.service';
import { PaymentMethodsService } from '@services/payment-methods.service';

@Component({
    selector: 'app-cash-update',
    templateUrl: './cash-update.component.html',
    styleUrls: ['./cash-update.component.scss'],
})
export class CashUpdateComponent implements OnDestroy, OnInit {
    public dateTime: Date;

    constructor(
        public cashDashboardService: CashDashboardService,
        public cashFormHandlerService: CashFormHandlerService,
        private cashCategoriesService: CashTransactionConceptsService,
        public paymentMethodsService: PaymentMethodsService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.cashDashboardService.editMode.next(true);
        const cashTransaction = this.route.snapshot.data['cashTransaction'];
        if (cashTransaction) {
            this.cashFormHandlerService.saved = false;
            this.cashFormHandlerService.cashTransaction = cashTransaction;

            // Assign parent transaction concept for usage in the update form
            this.cashFormHandlerService.transactionParentConcept = this.cashCategoriesService.selectableTransactionConcepts.filter(
                (concept) => this.cashFormHandlerService.cashTransaction.concept.parent.id === concept.id
            )[0];
            // Assign payment method
            this.cashFormHandlerService.cashTransaction.paymentMethod = this.paymentMethodsService.paymentMethods.filter(
                (paymentMethod) => this.cashFormHandlerService.cashTransaction.paymentMethod.id === paymentMethod.id
            )[0];

            // Assign date
            this.dateTime = this.cashFormHandlerService.cashTransaction.date.toDate();
            this.cashFormHandlerService.formGroup = this.cashFormHandlerService.load();
            this.cashFormHandlerService.patch();
        }
    }

    ngOnDestroy(): void {
        this.cashDashboardService.editMode.next(false);
    }

    async update() {
        this.cashFormHandlerService.cashTransaction.audit.createdAt = moment(this.dateTime);
        this.cashFormHandlerService.formGroup.patchValue({ date: moment(this.dateTime) });
        const result = await this.cashFormHandlerService.update();
        if (result) {
            await this.cashDashboardService.refreshGrid();
            this.router.navigate(['cash-dashboard/manage', { outlets: { left: 'grid', right: 'selected' } }]);
        }
    }

    back() {
        this.cashFormHandlerService.clean();
        this.router.navigate(['cash-dashboard/manage', { outlets: { left: 'grid', right: 'selected' } }]);
    }
}
