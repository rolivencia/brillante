import { CashCategoriesService } from '@app/dashboard/cash-dashboard/cash-categories/cash-categories.service';
import { CollectionView } from '@grapecity/wijmo';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TransactionConcept } from '@app/_models/cash-transaction';

@Component({
    selector: 'app-cash-transaction-concept-input-group',
    templateUrl: './cash-transaction-concept-input-group.component.html',
    styleUrls: ['./cash-transaction-concept-input-group.component.scss'],
})
export class CashTransactionConceptInputGroupComponent implements OnInit, OnDestroy, OnChanges {
    @Input() concept: TransactionConcept;
    @Input() itemsSource: TransactionConcept[] = [];
    @Input() label: string = '';
    @Input() canEditType: boolean = true;
    @Input() showSiblingsGrid: boolean = false;

    @Output() conceptChanged: EventEmitter<TransactionConcept> = new EventEmitter<TransactionConcept>();

    editMode: boolean = false;
    editModeSubscription: Subscription;

    conceptsCollection: CollectionView<TransactionConcept>;
    editedConcept: TransactionConcept = null;

    conceptsGridColumns: any[] = [
        { header: 'ID', binding: 'id', width: 50 },
        { header: 'Subconcepto', binding: 'description', width: '*' },
        {
            header: 'Tipo de Transacción',
            binding: 'transactionType.description',
            width: '*',
        },
        { header: 'Status', binding: '', width: '*' },
    ];

    constructor(public cashCategoriesService: CashCategoriesService) {}

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

    gridSelectionChange(concept: TransactionConcept) {
        this.concept = concept;
    }

    onSelectionChange($event: TransactionConcept) {
        this.conceptChanged.emit($event);
    }
}
