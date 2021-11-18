import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CashDashboardService } from '@management-view/cash-dashboard/cash-dashboard.service';
import { CashFormHandlerService } from '@management-view/cash-dashboard/cash-form-handler.service';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { formatDate } from '@angular/common';
import { MoneyTransactionConceptsService } from '@management-view/settings-dashboard/money-transaction-concepts/money-transaction-concepts.service';
import { PaymentMethodsService } from '@services/payment-methods.service';
import { User } from '@models/user';
import { AuthenticationService } from '@services/authentication.service';

@Component({
    selector: 'app-cash-add-new',
    templateUrl: './cash-add-new.component.html',
    styleUrls: ['./cash-add-new.component.scss'],
})
export class CashAddNewComponent implements AfterViewInit, OnDestroy, OnInit {
    public currentDateTime: string;
    public currentUser: User;

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
        this.cashFormHandlerService.cashTransaction.paymentMethod = this.paymentMethodsService.paymentMethods
            .slice(0, 1)
            .pop();
        this.cashFormHandlerService.cashTransaction.concept = this.cashFormHandlerService.transactionParentConcept.children
            .slice(0, 1)
            .pop();
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

    back() {
        this.cashFormHandlerService.clean();
        this.router.navigate(['cash-dashboard/manage', { outlets: { left: 'grid', right: 'selected' } }]);
    }
}
