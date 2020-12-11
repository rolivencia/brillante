import { CashTransactionConceptsFormHandlerService } from '@app/dashboard/cash-dashboard/cash-transaction-concepts/cash-transaction-concepts-form-handler.service';
import { CashTransactionConceptsService } from '@app/dashboard/cash-dashboard/cash-transaction-concepts/cash-transaction-concepts.service';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { TransactionConcept } from '@app/_models/cash-transaction';
import { CashTransactionConceptsHttpService } from '@app/dashboard/cash-dashboard/cash-transaction-concepts/cash-transaction-concepts.http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-cash-transaction-concept-add',
    templateUrl: './cash-transaction-concept-add.component.html',
    styleUrls: ['./cash-transaction-concept-add.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CashTransactionConceptAddComponent implements OnInit {
    @Input() label: string = '';
    @Input() parent: TransactionConcept;

    @Output() created: EventEmitter<TransactionConcept> = new EventEmitter<TransactionConcept>();

    concept: TransactionConcept = new TransactionConcept();
    addMode: boolean = false;

    constructor(
        public cashTransactionConceptsFormHandlerService: CashTransactionConceptsFormHandlerService,
        public cashTransactionConceptsService: CashTransactionConceptsService,
        private cashTransactionConceptsHttpService: CashTransactionConceptsHttpService,
        private toastrService: ToastrService
    ) {}

    ngOnInit(): void {
        this.concept.transactionType = [].concat(this.cashTransactionConceptsService.transactionTypes).pop();
        if (this.parent) {
            this.concept.parent = this.parent; // Contemplates case where parent has no children and concept no siblings
            this.concept.transactionType = this.parent.transactionType;
        } else {
            this.concept.userAssignable = true; // If parent concept, it should be user assignable by default.
        }
    }

    public async create() {
        // TODO: Issue #77 - Make it work using the form handler service
        // const result = await this.cashTransactionConceptsFormHandlerService.create();

        const result = await this.cashTransactionConceptsHttpService.create(this.concept).toPromise();

        if (result) {
            this.created.emit(result);
            this.toastrService.success(`El concepto ID: ${result.id} fue agregado exitosamente.`);
            this.goBack();
        } else {
            this.toastrService.error(`Ocurrió un error al intentar agregar el nuevo concepto.`);
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
