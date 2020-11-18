import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { TransactionConcept } from '@app/_models/cash-transaction';
import { Subscription } from 'rxjs';
import { CashCategoriesService } from '@app/dashboard/cash-dashboard/cash-categories/cash-categories.service';

@Component({
    selector: 'app-cash-transaction-concept-input-group',
    templateUrl: './cash-transaction-concept-input-group.component.html',
    styleUrls: ['./cash-transaction-concept-input-group.component.scss'],
})
export class CashTransactionConceptInputGroupComponent
    implements OnInit, OnDestroy {
    @Input() concept: TransactionConcept;
    @Input() itemsSource: TransactionConcept[];
    @Input() label: string = '';
    @Input() canEditType: boolean = true;

    @Output() conceptChanged: EventEmitter<
        TransactionConcept
    > = new EventEmitter<TransactionConcept>();

    editMode: boolean = false;
    editModeSubscription: Subscription;

    editedConcept: TransactionConcept = null;

    constructor(public cashCategoriesService: CashCategoriesService) {}

    ngOnInit(): void {
        this.editModeSubscription = this.cashCategoriesService.editMode.subscribe(
            (result) => {
                this.editMode = result.value;
                this.editedConcept = result.concept;
            }
        );
    }

    ngOnDestroy() {
        this.editModeSubscription.unsubscribe();
    }

    onSelectionChange($event: TransactionConcept) {
        this.conceptChanged.emit($event);
    }
}
