import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { TransactionConcept } from '@app/_models/cash-transaction';
import { Subscription } from 'rxjs';
import { CashTransactionConceptsService } from '@app/dashboard/cash-dashboard/cash-transaction-concepts/cash-transaction-concepts.service';
import { CollectionView } from '@grapecity/wijmo';

@Component({
    selector: 'app-cash-transaction-concept-update',
    templateUrl: './cash-transaction-concept-update.component.html',
    styleUrls: ['./cash-transaction-concept-update.component.scss'],
})
export class CashTransactionConceptUpdateComponent implements OnInit, OnDestroy, OnChanges {
    @Input() concept: TransactionConcept;
    @Input() itemsSource: TransactionConcept[] = [];
    @Input() label: string = '';
    @Input() canEditType: boolean = true;
    @Input() showSiblingsGrid: boolean = false;

    @Output() conceptChanged: EventEmitter<TransactionConcept> = new EventEmitter<TransactionConcept>();
    @Output() conceptEdited: EventEmitter<TransactionConcept> = new EventEmitter<TransactionConcept>();

    public editMode: boolean = false;
    public editedConcept: TransactionConcept = null;
    public editModeSubscription: Subscription;

    public conceptsCollection: CollectionView<TransactionConcept>;

    constructor(public cashCategoriesService: CashTransactionConceptsService) {}

    ngOnInit(): void {
        this.editModeSubscription = this.cashCategoriesService.editMode.subscribe((result) => {
            this.editMode = result.value;
            this.editedConcept = result.concept;
        });
    }

    ngOnChanges() {
        this.conceptsCollection = new CollectionView<TransactionConcept>(this.itemsSource);
    }

    ngOnDestroy() {
        this.editModeSubscription.unsubscribe();
    }

    onSelectionChange($event: TransactionConcept) {
        this.conceptChanged.emit($event);
    }
}
