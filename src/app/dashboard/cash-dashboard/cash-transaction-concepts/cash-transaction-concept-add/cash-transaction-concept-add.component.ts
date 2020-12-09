import { CashTransactionConceptsFormHandlerService } from '@app/dashboard/cash-dashboard/cash-transaction-concepts/cash-transaction-concepts-form-handler.service';
import { CashTransactionConceptsService } from '@app/dashboard/cash-dashboard/cash-transaction-concepts/cash-transaction-concepts.service';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { TransactionConcept } from '@app/_models/cash-transaction';

@Component({
    selector: 'app-cash-transaction-concept-add',
    templateUrl: './cash-transaction-concept-add.component.html',
    styleUrls: ['./cash-transaction-concept-add.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CashTransactionConceptAddComponent implements OnInit {
    @Input() label: string = '';
    @Input() parent: TransactionConcept;

    @Output() dataChanged: EventEmitter<TransactionConcept> = new EventEmitter<TransactionConcept>();

    concept: TransactionConcept = new TransactionConcept();
    addMode: boolean = false;

    constructor(
        public cashTransactionConceptsFormHandlerService: CashTransactionConceptsFormHandlerService,
        public cashTransactionConceptsService: CashTransactionConceptsService
    ) {}

    ngOnInit(): void {}

    public async create() {
        const result = await this.cashTransactionConceptsFormHandlerService.create();
        if (result) {
            this.cashTransactionConceptsService.addMode.next({
                value: false,
                concept: null,
            });
        }
    }

    cancel() {
        this.goBack();
    }

    goBack(concept: TransactionConcept = null) {
        this.cashTransactionConceptsService.addMode.next({
            value: false,
            concept: concept,
        });
    }
}
