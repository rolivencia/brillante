import { Component, OnInit } from '@angular/core';
import { CashTransactionConceptsService } from '@app/dashboard/cash-dashboard/cash-transaction-concepts/cash-transaction-concepts.service';

@Component({
    selector: 'app-cash-categories',
    templateUrl: './cash-transaction-concepts.component.html',
    styleUrls: ['./cash-transaction-concepts.component.scss'],
})
export class CashTransactionConceptsComponent implements OnInit {
    constructor(public cashCategoriesService: CashTransactionConceptsService) {}

    ngOnInit(): void {
        this.cashCategoriesService.transactionParentConcept = this.cashCategoriesService.transactionConcepts
            .slice(0, 1)
            .pop();
        this.cashCategoriesService.transactionConcept = this.cashCategoriesService.transactionParentConcept.children
            .slice(0, 1)
            .pop();
    }

    changeParentConcept(event) {
        this.cashCategoriesService.transactionParentConcept = event;
    }

    changeSelectedConcept(event) {
        this.cashCategoriesService.transactionConcept = event;
    }

    onDataChanged(event) {
        console.log(event);
    }
}
