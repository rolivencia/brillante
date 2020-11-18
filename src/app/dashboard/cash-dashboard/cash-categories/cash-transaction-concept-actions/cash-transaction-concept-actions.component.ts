import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { CashCategoriesService } from '@app/dashboard/cash-dashboard/cash-categories/cash-categories.service';
import { Subscription } from 'rxjs';
import { TransactionConcept } from '@app/_models/cash-transaction';

@Component({
    selector: 'app-cash-transaction-concept-actions',
    templateUrl: './cash-transaction-concept-actions.component.html',
    styleUrls: ['./cash-transaction-concept-actions.component.scss'],
})
export class CashTransactionConceptActionsComponent
    implements OnInit, OnDestroy {
    @Input() concept: TransactionConcept;
    @Output() editedConcept: EventEmitter<
        TransactionConcept
    > = new EventEmitter<TransactionConcept>();

    editMode: { value: boolean } & { concept: TransactionConcept } = {
        value: false,
        concept: null,
    };
    editModeSubscription: Subscription;

    constructor(private cashCategoriesService: CashCategoriesService) {}

    ngOnInit(): void {
        this.editModeSubscription = this.cashCategoriesService.editMode.subscribe(
            (result) => {
                this.editMode.value = result.value;
                this.editMode.concept = result.concept;
            }
        );
    }

    ngOnDestroy(): void {
        this.editModeSubscription.unsubscribe();
    }

    addNew() {
        //TODO: Implement method
    }

    save() {
        //TODO: Implement method
        console.log(this.concept);
    }

    toggleEditMode(editModeStatus: boolean, concept: TransactionConcept) {
        this.cashCategoriesService.editMode.next({
            value: editModeStatus,
            concept: concept,
        });
    }

    toggleStatus() {
        //TODO: Implement method
    }
}
