import { CashTransactionConceptsFormHandlerService } from '@app/dashboard/cash-dashboard/cash-transaction-concepts/cash-transaction-concepts-form-handler.service';
import { CashTransactionConceptsService } from '@app/dashboard/cash-dashboard/cash-transaction-concepts/cash-transaction-concepts.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TransactionConcept } from '@app/_models/cash-transaction';

@Component({
    selector: 'app-cash-transaction-concept-add',
    templateUrl: './cash-transaction-concept-add.component.html',
    styleUrls: ['./cash-transaction-concept-add.component.scss'],
})
export class CashTransactionConceptAddComponent implements OnInit, OnDestroy {
    @Input() label: string = '';

    concept: TransactionConcept = new TransactionConcept();
    addMode: boolean = false;
    addModeModeSubscription: Subscription;

    constructor(
        public cashTransactionConceptsFormHandlerService: CashTransactionConceptsFormHandlerService,
        public cashCategoriesService: CashTransactionConceptsService
    ) {}

    ngOnInit(): void {
        this.addModeModeSubscription = this.cashCategoriesService.addMode.subscribe((result) => {
            this.addMode = result.value;
            this.concept = result.concept;
        });
    }

    ngOnDestroy() {
        this.addModeModeSubscription.unsubscribe();
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
