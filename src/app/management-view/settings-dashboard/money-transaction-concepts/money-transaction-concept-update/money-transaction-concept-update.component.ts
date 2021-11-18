import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TransactionConcept } from '@models/cash-transaction';
import { Subscription } from 'rxjs';
import { MoneyTransactionConceptsService } from '@management-view/settings-dashboard/money-transaction-concepts/money-transaction-concepts.service';
import { MoneyTransactionConceptsHttpService } from '@management-view/settings-dashboard/money-transaction-concepts/money-transaction-concepts.http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-cash-transaction-concept-update',
    templateUrl: './money-transaction-concept-update.component.html',
    styleUrls: ['./money-transaction-concept-update.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoneyTransactionConceptUpdateComponent implements OnInit, OnDestroy {
    @Input() concept: TransactionConcept;
    @Input() label: string = '';
    @Input() canEditType: boolean = true;
    @Input() showSiblingsGrid: boolean = false;

    @Output() updated: EventEmitter<TransactionConcept> = new EventEmitter<TransactionConcept>();

    public editMode: boolean = false;
    public editedConcept: TransactionConcept = null;
    public editModeSubscription: Subscription;

    constructor(
        private moneyTransactionConceptsHttpService: MoneyTransactionConceptsHttpService,
        public moneyTransactionConceptsService: MoneyTransactionConceptsService,
        private toastrService: ToastrService
    ) {}

    ngOnInit(): void {
        this.editModeSubscription = this.moneyTransactionConceptsService.editMode.subscribe((result) => {
            this.editMode = result.value;
            this.editedConcept = result.concept;
        });
    }

    ngOnDestroy() {
        this.editModeSubscription.unsubscribe();
    }

    cancel() {
        this.goBack();
    }

    goBack() {
        this.moneyTransactionConceptsService.editMode.next({
            value: false,
            concept: this.concept,
        });
    }

    async save() {
        // TODO: Issue #77 - Make it work using the form handler service
        // const result = await this.cashTransactionConceptsFormHandlerService.create();

        const result = await this.moneyTransactionConceptsHttpService.update(this.concept).toPromise();
        if (result.pop()) {
            this.toastrService.info(`Concepto ID: ${this.concept.id} actualizado correctamente.`);
            this.updated.emit(this.concept);
            this.goBack();
        } else {
            this.toastrService.error(`Error al actualizar el concepto ID: ${this.concept.id}.`);
        }
    }
}
