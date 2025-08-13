import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CashDashboardService } from '@pages/cash-dashboard/cash-dashboard.service';
import { CashFormHandlerService } from '@pages/cash-dashboard/cash-form-handler.service';
import { MoneyTransactionConceptsService } from '@pages/settings-dashboard/money-transaction-concepts/money-transaction-concepts.service';
import { PaymentMethodsService } from '@services/payment-methods.service';
import { ChangeEventArgs, FieldSettingsModel } from '@syncfusion/ej2-angular-dropdowns';
import { TransactionConcept } from '@models/cash-transaction';

@Component({
    selector: 'app-cash-update',
    templateUrl: './cash-update.component.html',
    styleUrls: ['./cash-update.component.scss'],
})
export class CashUpdateComponent implements OnDestroy, OnInit {
    get parentConceptIsUserAssignable(): boolean {
        return this.cashFormHandlerService.cashTransaction.concept?.parent.userAssignable;
    }

    get conceptIsUserAssignable(): boolean {
        return this.cashFormHandlerService.cashTransaction.concept?.userAssignable;
    }

    public dateTime: Date;

    public transactionConceptFields: FieldSettingsModel = { text: 'description', value: 'id' };
    public idTransactionParentConcept: number;
    public idTransactionConcept: number;

    constructor(
        public cashDashboardService: CashDashboardService,
        public cashFormHandlerService: CashFormHandlerService,
        public moneyTransactionConceptsService: MoneyTransactionConceptsService,
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
            this.cashFormHandlerService.transactionParentConcept = this.moneyTransactionConceptsService.selectableTransactionConcepts.filter(
                (concept) => this.cashFormHandlerService.cashTransaction.concept.parent.id === concept.id
            )[0];

            this.idTransactionParentConcept = this.cashFormHandlerService.transactionParentConcept.id;
            this.idTransactionConcept = this.cashFormHandlerService.cashTransaction.concept.id;

            // Assign payment method
            this.cashFormHandlerService.cashTransaction.paymentMethod = this.paymentMethodsService.paymentMethods.filter(
                (paymentMethod) => this.cashFormHandlerService.cashTransaction.paymentMethod.id === paymentMethod.id
            )[0];

            // Assign date
            this.dateTime = this.cashFormHandlerService.cashTransaction.date;
            this.cashFormHandlerService.formGroup = this.cashFormHandlerService.load();
            this.cashFormHandlerService.patch();
        }
    }

    ngOnDestroy(): void {
        this.cashDashboardService.editMode.next(false);
    }

    async update() {
        this.cashFormHandlerService.cashTransaction.audit.createdAt = new Date(this.dateTime);
        this.cashFormHandlerService.formGroup.patchValue({ date: new Date(this.dateTime) });
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

    public onTransactionParentConceptChange(event: ChangeEventArgs) {
        const parentConcept = event.itemData as TransactionConcept;
        this.cashFormHandlerService.transactionParentConcept = parentConcept;

        // Reassign child to the first of collection
        this.idTransactionConcept = parentConcept.children[0].id;
        this.cashFormHandlerService.cashTransaction.concept = parentConcept.children[0];
        this.cashFormHandlerService.patch();
    }

    public onTransactionConceptChange(event: ChangeEventArgs) {
        this.cashFormHandlerService.cashTransaction.concept = event.itemData as TransactionConcept;
        this.cashFormHandlerService.patch();
    }
}
