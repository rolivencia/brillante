import { Component, OnInit } from '@angular/core';
import { CashTransactionConceptsService } from '@app/dashboard/cash-dashboard/cash-transaction-concepts/cash-transaction-concepts.service';
import { TransactionConcept } from '@app/_models/cash-transaction';

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

    async onCreateConcept($event: TransactionConcept) {
        await this.cashTransactionConceptsService.reloadConcepts();
        this.cashTransactionConceptsService.transactionParentConcept = this.cashTransactionConceptsService.transactionConcepts
            .filter((Concept) => Concept.id === $event.parent.id)
            .pop();
        this.cashTransactionConceptsService.transactionConcept = this.cashTransactionConceptsService.transactionConcepts
            .filter((Concept) => Concept.id === $event.id)
            .pop();
    }

    async onCreateParentConcept($event: TransactionConcept) {
        await this.cashTransactionConceptsService.reloadConcepts();
        this.cashTransactionConceptsService.transactionParentConcept = this.cashTransactionConceptsService.transactionConcepts
            .filter((Concept) => Concept.id === $event.id)
            .pop();
        this.cashTransactionConceptsService.transactionConcept = null;
    }

    async onUpdateParentConcept($event: TransactionConcept) {
        await this.cashTransactionConceptsService.reloadConcepts();
        this.cashTransactionConceptsService.transactionParentConcept = this.cashTransactionConceptsService.transactionConcepts
            .filter((Concept) => Concept.id === $event.id)
            .pop();
    }

    async onUpdateConcept($event: TransactionConcept) {
        await this.cashTransactionConceptsService.reloadConcepts();

        this.cashTransactionConceptsService.transactionParentConcept = this.cashTransactionConceptsService.transactionConcepts
            .filter((Concept) => Concept.id === $event.parent.id)
            .pop();
        this.cashTransactionConceptsService.transactionConcept = this.cashTransactionConceptsService.transactionConcepts
            .filter((Concept) => Concept.id === $event.id)
            .pop();
    }

    changeParentConcept(event) {
        this.cashTransactionConceptsService.transactionParentConcept = event;
    }

    changeSelectedConcept(event) {
        //this.cashTransactionConceptsService.transactionConcept = event;
    }
}
