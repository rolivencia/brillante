import { CollectionView } from '@grapecity/wijmo';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { TransactionConcept } from '@app/_models/cash-transaction';
import { CashTransactionConceptsService } from '@app/dashboard/cash-dashboard/cash-transaction-concepts/cash-transaction-concepts.service';
import { CashTransactionConceptsHttpService } from '@app/dashboard/cash-dashboard/cash-transaction-concepts/cash-transaction-concepts.http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-cash-transaction-concept-info',
    templateUrl: './cash-transaction-concept-selected-details.component.html',
    styleUrls: ['./cash-transaction-concept-selected-details.component.scss'],
})
export class CashTransactionConceptSelectedDetailsComponent implements OnInit, OnChanges {
    @Input() concept: TransactionConcept;
    @Input() addMode: boolean = false;
    @Input() editMode: boolean = false;
    @Input() itemsSource: TransactionConcept[] = [];
    @Input() label: string = '';
    @Input() showSiblingsGrid: boolean = false;

    @Output() conceptChanged: EventEmitter<TransactionConcept> = new EventEmitter<TransactionConcept>();
    @Output() selectionChanged: EventEmitter<TransactionConcept> = new EventEmitter<TransactionConcept>();

    public conceptsCollection: CollectionView<TransactionConcept>;

    constructor(
        private cashTransactionConceptsHttpService: CashTransactionConceptsHttpService,
        private cashTransactionConceptsService: CashTransactionConceptsService,
        private toastrService: ToastrService
    ) {}

    ngOnInit(): void {}

    ngOnChanges() {
        this.conceptsCollection = new CollectionView<TransactionConcept>(this.itemsSource);
    }

    enableAddMode() {
        const concept = new TransactionConcept();
        concept.parent = this.concept
            ? this.concept.parent
            : this.cashTransactionConceptsService.transactionParentConcept;

        this.cashTransactionConceptsService.addMode.next({
            value: true,
            concept: concept,
        });
    }

    enableEditMode() {
        this.cashTransactionConceptsService.editMode.next({
            value: true,
            concept: this.concept,
        });
    }

    async toggleStatus() {
        const result = this.concept.enabled
            ? await this.cashTransactionConceptsHttpService.disable(this.concept).toPromise()
            : await this.cashTransactionConceptsHttpService.enable(this.concept).toPromise();

        if (result.pop()) {
            this.concept.enabled = !this.concept.enabled; // Toggle status to opposite if update was done in DB
            this.toastrService.info(
                `Concepto ID: ${this.concept.id} ${
                    this.concept.enabled ? 'habilitado' : 'deshabilitado'
                } correctamente.`
            );
            this.conceptChanged.emit(this.concept);
        } else {
            this.toastrService.error(`Error al actualizar status del concepto ID: ${this.concept.id}.`);
        }
    }

    onSelectionChange($event: TransactionConcept) {
        this.selectionChanged.emit($event);
    }
}
