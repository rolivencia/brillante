import { Component, OnInit } from '@angular/core';
import { TransactionConcept } from '@models/cash-transaction';
import { MoneyTransactionConceptsService } from '@pages/settings-dashboard/money-transaction-concepts/money-transaction-concepts.service';

@Component({
    selector: 'app-cash-categories',
    templateUrl: './money-transaction-concepts.component.html',
    styleUrls: ['./money-transaction-concepts.component.scss'],
    standalone: false,
})
export class MoneyTransactionConceptsComponent implements OnInit {
    constructor(public moneyTransactionConceptsService: MoneyTransactionConceptsService) {}

    ngOnInit(): void {
        this.moneyTransactionConceptsService.transactionParentConcept = this.moneyTransactionConceptsService.transactionConcepts
            .slice(0, 1)
            .pop();
        this.moneyTransactionConceptsService.transactionConcept = this.moneyTransactionConceptsService.transactionParentConcept.children
            .slice(0, 1)
            .pop();
    }

    async onCreateConcept($event: TransactionConcept) {
        await this.moneyTransactionConceptsService.reloadConcepts();
        this.moneyTransactionConceptsService.transactionParentConcept = this.moneyTransactionConceptsService.transactionConcepts
            .filter((Concept) => Concept.id === $event.parent.id)
            .pop();
        this.moneyTransactionConceptsService.transactionConcept = this.moneyTransactionConceptsService.transactionConcepts
            .filter((Concept) => Concept.id === $event.id)
            .pop();
    }

    async onCreateParentConcept($event: TransactionConcept) {
        await this.moneyTransactionConceptsService.reloadConcepts();
        this.moneyTransactionConceptsService.transactionParentConcept = this.moneyTransactionConceptsService.transactionConcepts
            .filter((Concept) => Concept.id === $event.id)
            .pop();
        this.moneyTransactionConceptsService.transactionConcept = null;
    }

    async onUpdateParentConcept($event: TransactionConcept) {
        await this.moneyTransactionConceptsService.reloadConcepts();
        this.moneyTransactionConceptsService.transactionParentConcept = this.moneyTransactionConceptsService.transactionConcepts
            .filter((Concept) => Concept.id === $event.id)
            .pop();
    }

    async onUpdateConcept($event: TransactionConcept) {
        await this.moneyTransactionConceptsService.reloadConcepts();

        this.moneyTransactionConceptsService.transactionParentConcept = this.moneyTransactionConceptsService.transactionConcepts
            .filter((Concept) => Concept.id === $event.parent.id)
            .pop();
        this.moneyTransactionConceptsService.transactionConcept = this.moneyTransactionConceptsService.transactionConcepts
            .filter((Concept) => Concept.id === $event.id)
            .pop();
    }

    changeParentConcept(event) {
        this.moneyTransactionConceptsService.transactionParentConcept = event;
    }

    changeSelectedConcept(event) {
        //this.cashTransactionConceptsService.transactionConcept = event;
    }
}
