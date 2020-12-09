import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { TransactionConcept } from '@app/_models/cash-transaction';
import { Subscription } from 'rxjs';
import { CashTransactionConceptsService } from '@app/dashboard/cash-dashboard/cash-transaction-concepts/cash-transaction-concepts.service';
import { CollectionView } from '@grapecity/wijmo';
import { CashTransactionConceptsHttpService } from '@app/dashboard/cash-dashboard/cash-transaction-concepts/cash-transaction-concepts.http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-cash-transaction-concept-update',
    templateUrl: './cash-transaction-concept-update.component.html',
    styleUrls: ['./cash-transaction-concept-update.component.scss'],
})
export class CashTransactionConceptUpdateComponent implements OnInit, OnDestroy {
    @Input() concept: TransactionConcept;
    @Input() label: string = '';
    @Input() canEditType: boolean = true;
    @Input() showSiblingsGrid: boolean = false;

    @Output() conceptChanged: EventEmitter<TransactionConcept> = new EventEmitter<TransactionConcept>();
    @Output() conceptEdited: EventEmitter<TransactionConcept> = new EventEmitter<TransactionConcept>();

    public editMode: boolean = false;
    public editedConcept: TransactionConcept = null;
    public editModeSubscription: Subscription;

    constructor(
        private cashConceptsHttpService: CashTransactionConceptsHttpService,
        public cashTransactionConceptsService: CashTransactionConceptsService,
        private toastrService: ToastrService
    ) {}

    ngOnInit(): void {
        this.editModeSubscription = this.cashTransactionConceptsService.editMode.subscribe((result) => {
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

    goBack(concept: TransactionConcept = null) {
        this.cashTransactionConceptsService.editMode.next({
            value: false,
            concept: concept,
        });
    }

    async save() {
        // TODO: Issue #77 - Make it work using the form handler service
        // const result = await this.cashTransactionConceptsFormHandlerService.create();

        const result = await this.cashConceptsHttpService.update(this.concept).toPromise();
        if (result.pop()) {
            this.toastrService.info(`Concepto ID: ${this.concept.id} actualizado correctamente.`);
            this.conceptChanged.emit(this.concept);
        } else {
            this.toastrService.error(`Error al actualizar el concepto ID: ${this.concept.id}.`);
        }

        this.goBack();
    }
}
