import { MoneyTransactionConceptsService } from '@management-view/settings-dashboard/money-transaction-concepts/money-transaction-concepts.service';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { TransactionConcept } from '@models/cash-transaction';
import { RowSelectEventArgs } from '@syncfusion/ej2-angular-grids';

@Component({
    selector: 'app-cash-transaction-concept-input-group',
    templateUrl: './money-transaction-concept-input-group.component.html',
    styleUrls: ['./money-transaction-concept-input-group.component.scss'],
})
export class MoneyTransactionConceptInputGroupComponent implements OnInit, OnDestroy {
    @Input() concept: TransactionConcept;
    @Input() parent: TransactionConcept = null;

    @Input() itemsSource: TransactionConcept[] = [];
    @Input() label: string = '';
    @Input() canEditType: boolean = true;
    @Input() showSiblingsGrid: boolean = false;

    @Output() conceptCreated: EventEmitter<TransactionConcept> = new EventEmitter<TransactionConcept>();
    @Output() conceptEdited: EventEmitter<TransactionConcept> = new EventEmitter<TransactionConcept>();
    @Output() selectedConceptChanged: EventEmitter<TransactionConcept> = new EventEmitter<TransactionConcept>();

    get createConditions(): boolean {
        const sameParents = this.selectedConcept?.parent?.id === this.concept?.parent?.id;
        return ((this.addMode && sameParents) || !this.concept) && !this.detailsConditions;
    }
    get editConditions(): boolean {
        return this.editMode && !this.detailsConditions;
    }

    get detailsConditions(): boolean {
        const diffConcept = this.selectedConcept?.id !== this.concept?.id;
        const diffParents = this.selectedConcept?.parent?.id !== this.concept?.parent?.id;
        const isViewMode = !this.addMode && !this.editMode;
        const notViewMode = this.editMode || this.addMode;

        return isViewMode || (notViewMode && diffConcept && diffParents);
    }

    public addMode: boolean = false;
    public editMode: boolean = false;
    public selectedConcept: TransactionConcept = null;

    public addModeSubscription: Subscription;
    public editModeSubscription: Subscription;

    constructor(public moneyTransactionConceptsService: MoneyTransactionConceptsService) {}

    ngOnInit(): void {
        this.addModeSubscription = this.moneyTransactionConceptsService.addMode.subscribe((result) => {
            this.addMode = result.value;
            this.selectedConcept = result.concept;
        });

        this.editModeSubscription = this.moneyTransactionConceptsService.editMode.subscribe((result) => {
            this.editMode = result.value;
            this.selectedConcept = result.concept;
        });
    }

    ngOnDestroy() {
        this.addModeSubscription.unsubscribe();
        this.editModeSubscription.unsubscribe();
    }

    gridSelectionChange(event: RowSelectEventArgs) {
        const concept: TransactionConcept = event.data as TransactionConcept;
        if (concept) {
            this.concept = concept;
            this.selectedConceptChanged.emit(concept);
        }
    }

    onSelectionChange($event: TransactionConcept) {
        this.selectedConceptChanged.emit($event);
    }

    onConceptCreated($event: TransactionConcept) {
        this.conceptCreated.emit($event);
    }

    onConceptUpdated($event: TransactionConcept) {
        this.conceptEdited.emit($event);
    }
}
