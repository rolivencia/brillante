import { CollectionView } from '@grapecity/wijmo';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { TransactionConcept } from '@app/_models/cash-transaction';

@Component({
    selector: 'app-cash-transaction-concept-info',
    templateUrl: './cash-transaction-concept-info.component.html',
    styleUrls: ['./cash-transaction-concept-info.component.scss'],
})
export class CashTransactionConceptInfoComponent implements OnInit, OnChanges {
    @Input() concept: TransactionConcept;
    @Input() editMode: boolean = false;
    @Input() itemsSource: TransactionConcept[] = [];
    @Input() label: string = '';
    @Input() showSiblingsGrid: boolean = false;

    @Output() conceptChanged: EventEmitter<TransactionConcept> = new EventEmitter<TransactionConcept>();

    public conceptsCollection: CollectionView<TransactionConcept>;

    constructor() {}

    ngOnInit(): void {}

    ngOnChanges() {
        this.conceptsCollection = new CollectionView<TransactionConcept>(this.itemsSource);
    }

    onSelectionChange($event: TransactionConcept) {
        this.conceptChanged.emit($event);
    }
}
