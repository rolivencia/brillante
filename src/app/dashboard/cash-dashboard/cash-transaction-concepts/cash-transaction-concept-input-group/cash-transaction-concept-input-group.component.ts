import { CashTransactionConceptsService } from '@app/dashboard/cash-dashboard/cash-transaction-concepts/cash-transaction-concepts.service';
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

    @Output() conceptAdded: EventEmitter<TransactionConcept> = new EventEmitter<TransactionConcept>();
    @Output() conceptChanged: EventEmitter<TransactionConcept> = new EventEmitter<TransactionConcept>();
    @Output() conceptEdited: EventEmitter<TransactionConcept> = new EventEmitter<TransactionConcept>();

    public addMode: boolean = false;
    public editMode: boolean = false;
    public selectedConcept: TransactionConcept = null;

    public addModeSubscription: Subscription;
    public editModeSubscription: Subscription;

    public conceptsCollection: CollectionView<TransactionConcept>;

    conceptsGridColumns: any[] = [
        { header: 'ID', binding: 'id', width: 50 },
        { header: 'Subconcepto', binding: 'description', width: '*' },
        {
            header: 'Tipo de Transacción',
            binding: 'transactionType.description',
            width: '*',
        },
        { header: 'Modificable', binding: 'modifiable', width: '*' },
        { header: 'Status', binding: 'enabled', width: '*' },
    ];

    constructor(public cashTransactionConceptsService: CashTransactionConceptsService) {}

    ngOnInit(): void {
        this.addModeSubscription = this.cashTransactionConceptsService.addMode.subscribe((result) => {
            this.addMode = result.value;
            this.selectedConcept = result.concept;
        });

        this.editModeSubscription = this.cashTransactionConceptsService.editMode.subscribe((result) => {
            this.editMode = result.value;
            this.selectedConcept = result.concept;
        });
    }

    ngOnChanges() {
        this.conceptsCollection = new CollectionView<TransactionConcept>(this.itemsSource);
    }

    ngOnDestroy() {
        this.addModeSubscription.unsubscribe();
        this.editModeSubscription.unsubscribe();
    }

    gridSelectionChange(concept: TransactionConcept) {
        if (concept) {
            this.concept = concept;
        }
    }

    onDataChange($event: TransactionConcept) {
        this.conceptEdited.emit($event);
    }

    onSelectionChange($event: TransactionConcept) {
        this.conceptChanged.emit($event);
    }
}
