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

    editMode: boolean = false;
    editModeSubscription: Subscription;

    constructor(public cashCategoriesService: CashCategoriesService) {}

    ngOnInit(): void {
        this.editModeSubscription = this.cashCategoriesService.editMode.subscribe((result) => {
            this.editMode = result;
        });
    }

    ngOnDestroy() {
        this.editModeSubscription.unsubscribe();
    }
}
