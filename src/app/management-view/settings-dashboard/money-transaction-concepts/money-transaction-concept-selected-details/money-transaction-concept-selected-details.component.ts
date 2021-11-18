import { CollectionView } from '@grapecity/wijmo';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { TransactionConcept } from '@models/cash-transaction';
import { MoneyTransactionConceptsService } from '@management-view/settings-dashboard/money-transaction-concepts/money-transaction-concepts.service';
import { MoneyTransactionConceptsHttpService } from '@management-view/settings-dashboard/money-transaction-concepts/money-transaction-concepts.http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-cash-transaction-concept-details',
    templateUrl: './money-transaction-concept-selected-details.component.html',
    styleUrls: ['./money-transaction-concept-selected-details.component.scss'],
})
export class MoneyTransactionConceptSelectedDetailsComponent implements OnInit, OnChanges {
    @Input() concept: TransactionConcept;
    @Input() addMode: boolean = false;
    @Input() editMode: boolean = false;
    @Input() itemsSource: TransactionConcept[] = [];
    @Input() label: string = '';
    @Input() showSiblingsGrid: boolean = false;

    @Output() statusChanged: EventEmitter<TransactionConcept> = new EventEmitter<TransactionConcept>();
    @Output() selectionChanged: EventEmitter<TransactionConcept> = new EventEmitter<TransactionConcept>();

    public conceptsCollection: CollectionView<TransactionConcept>;

    constructor(
        private moneyTransactionConceptsHttpService: MoneyTransactionConceptsHttpService,
        private moneyTransactionConceptsService: MoneyTransactionConceptsService,
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
            : this.moneyTransactionConceptsService.transactionParentConcept;

        this.moneyTransactionConceptsService.addMode.next({
            value: true,
            concept: concept,
        });
    }

    enableEditMode() {
        this.moneyTransactionConceptsService.editMode.next({
            value: true,
            concept: this.concept,
        });
    }

    async toggleStatus() {
        const result = this.concept.enabled
            ? await this.moneyTransactionConceptsHttpService.disable(this.concept).toPromise()
            : await this.moneyTransactionConceptsHttpService.enable(this.concept).toPromise();

        if (result.pop()) {
            this.concept.enabled = !this.concept.enabled; // Toggle status to opposite if update was done in DB
            this.toastrService.info(
                `Concepto ID: ${this.concept.id} ${
                    this.concept.enabled ? 'habilitado' : 'deshabilitado'
                } correctamente.`
            );
            this.statusChanged.emit(this.concept);
        } else {
            this.toastrService.error(`Error al actualizar status del concepto ID: ${this.concept.id}.`);
        }
    }

    onSelectionChange($event: TransactionConcept) {
        if ($event) {
            this.selectionChanged.emit($event);
        }
    }
}
