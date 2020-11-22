import { CashCategoriesService } from '@app/dashboard/cash-dashboard/cash-categories/cash-categories.service';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TransactionConcept } from '@app/_models/cash-transaction';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-cash-transaction-concept-info',
    templateUrl: './cash-transaction-concept-info.component.html',
    styleUrls: ['./cash-transaction-concept-info.component.scss'],
})
export class CashTransactionConceptInfoComponent implements OnInit, OnDestroy {
    @Input() transactionConcept: TransactionConcept;
    @Input() canEditType: boolean = true;
    @Input() showDescriptionLabel: boolean = true;

    editMode: { value: boolean } & { concept: TransactionConcept } = {
        value: false,
        concept: null,
    };
    editModeSubscription: Subscription;

    constructor(public cashCategoriesService: CashCategoriesService) {}

    ngOnInit(): void {
        this.editModeSubscription = this.cashCategoriesService.editMode.subscribe((result) => {
            this.editMode.value = result.value;
            this.editMode.concept = result.concept;
        });
    }

    ngOnDestroy() {
        this.editModeSubscription.unsubscribe();
    }

    onConceptEdit() {}
}
