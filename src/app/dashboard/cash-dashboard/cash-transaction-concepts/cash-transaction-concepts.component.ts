import { Component, OnInit } from '@angular/core';
import { CashTransactionConceptsService } from '@app/dashboard/cash-dashboard/cash-transaction-concepts/cash-transaction-concepts.service';

@Component({
    selector: 'app-cash-categories',
    templateUrl: './cash-transaction-concepts.component.html',
    styleUrls: ['./cash-transaction-concepts.component.scss'],
})
export class CashTransactionConceptsComponent implements OnInit {
    constructor(public cashTransactionConceptsService: CashTransactionConceptsService) {}

    ngOnInit(): void {
        this.cashTransactionConceptsService.transactionParentConcept = this.cashTransactionConceptsService.transactionConcepts
            .slice(0, 1)
            .pop();
        this.cashTransactionConceptsService.transactionConcept = this.cashTransactionConceptsService.transactionParentConcept.children
            .slice(0, 1)
            .pop();
    }

    changeParentConcept(event) {
        this.cashTransactionConceptsService.transactionParentConcept = event;
    }

    changeSelectedConcept(event) {
        this.cashTransactionConceptsService.transactionConcept = event;
    }

    onDataChanged(event) {
        console.log(event);
    }
}
