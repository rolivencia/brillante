import { CashTransactionConceptsFormHandlerService } from '@app/dashboard/cash-dashboard/cash-transaction-concepts/cash-transaction-concepts-form-handler.service';
import { CashTransactionConceptsService } from '@app/dashboard/cash-dashboard/cash-transaction-concepts/cash-transaction-concepts.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TransactionConcept } from '@app/_models/cash-transaction';

@Component({
    selector: 'app-cash-transaction-concept-add',
    templateUrl: './cash-transaction-concept-add.component.html',
    styleUrls: ['./cash-transaction-concept-add.component.scss'],
})
export class CashTransactionConceptAddComponent implements OnInit, OnDestroy {
    concept: TransactionConcept;
    editMode: boolean = false;
    editedConcept: TransactionConcept = null;
    editModeSubscription: Subscription;

    constructor(
        public cashTransactionConceptsFormHandlerService: CashTransactionConceptsFormHandlerService,
        public cashCategoriesService: CashTransactionConceptsService
    ) {}

    ngOnInit(): void {
        this.editModeSubscription = this.cashCategoriesService.editMode.subscribe((result) => {
            this.editMode = result.value;
        });
    }

    ngOnDestroy() {
        this.editModeSubscription.unsubscribe();
        //TODO: Add removal of editMode
    }

    public async create() {
        const result = await this.cashTransactionConceptsFormHandlerService.create();
        if (result) {
            console.log(result);
        }
    }

    cancel() {}
}
