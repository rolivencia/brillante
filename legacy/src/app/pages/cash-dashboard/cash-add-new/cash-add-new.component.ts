import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CashDashboardService } from '@pages/cash-dashboard/cash-dashboard.service';
import { CashFormHandlerService } from '@pages/cash-dashboard/cash-form-handler.service';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { formatDate } from '@angular/common';
import { MoneyTransactionConceptsService } from '@pages/settings-dashboard/money-transaction-concepts/money-transaction-concepts.service';
import { PaymentMethodsService } from '@services/payment-methods.service';
import { User } from '@models/user';
import { AuthenticationService } from '@services/authentication.service';
import { ChangeEventArgs, FieldSettingsModel } from '@syncfusion/ej2-angular-dropdowns';
import { TransactionConcept } from '@models/cash-transaction';

@Component({
    selector: 'app-cash-add-new',
    templateUrl: './cash-add-new.component.html',
    styleUrls: ['./cash-add-new.component.scss'],
    standalone: false,
})
export class CashAddNewComponent implements AfterViewInit, OnDestroy, OnInit {
    public currentDateTime: string;
    public currentUser: User;

    public transactionConceptFields: FieldSettingsModel = { text: 'description', value: 'id' };
    public idTransactionParentConcept: number;
    public idTransactionConcept: number;

    constructor(
        public cashCategoriesService: MoneyTransactionConceptsService,
        public cashDashboardService: CashDashboardService,
        public cashFormHandlerService: CashFormHandlerService,
        private router: Router,
        public authenticationService: AuthenticationService,
        public paymentMethodsService: PaymentMethodsService
    ) {
        this.authenticationService.currentUser.subscribe((x) => (this.currentUser = x));
    }

    ngOnInit(): void {
        this.cashDashboardService.editMode.next(true);
        this.cashFormHandlerService.transactionParentConcept = this.cashCategoriesService.selectableTransactionConcepts
            .slice(0, 1)
            .pop();

        this.idTransactionParentConcept = this.cashFormHandlerService.transactionParentConcept.id;
        this.idTransactionConcept = this.cashFormHandlerService.transactionParentConcept.children[0].id;

        this.cashFormHandlerService.cashTransaction.paymentMethod = this.paymentMethodsService.paymentMethods
            .slice(0, 1)
            .pop();
        this.cashFormHandlerService.cashTransaction.concept = this.cashFormHandlerService.transactionParentConcept.children
            .slice(0, 1)
            .pop();
        this.cashFormHandlerService.cashTransaction.payments = [
            { amount: 0, paymentMethod: this.cashFormHandlerService.cashTransaction.paymentMethod },
        ];
        this.cashFormHandlerService.formGroup = this.cashFormHandlerService.load();
        this.cashFormHandlerService.patch();
    }

    ngAfterViewInit() {
        interval(1000).subscribe(() => {
            // Current Date Time variable must be updated when displaying the component. Do not modify this.
            this.currentDateTime = formatDate(new Date(), 'dd-MM-yyyy HH:mm', 'en-US', '-0300');
        });
    }

    ngOnDestroy(): void {
        this.cashDashboardService.editMode.next(false);
    }

    public async create() {
        const result = await this.cashFormHandlerService.create();
        if (result) {
            await this.cashDashboardService.refreshGrid();
            this.router.navigate(['cash-dashboard/manage', { outlets: { left: 'grid', right: 'selected' } }]);
        }
    }

    public back() {
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
