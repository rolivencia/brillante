import { Component, OnDestroy, OnInit } from '@angular/core';
import { CashCategoriesService } from '@app/dashboard/cash-dashboard/cash-categories/cash-categories.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-cash-transaction-concept-actions',
    templateUrl: './cash-transaction-concept-actions.component.html',
    styleUrls: ['./cash-transaction-concept-actions.component.scss'],
})
export class CashTransactionConceptActionsComponent implements OnInit, OnDestroy {
    editMode: boolean = false;
    editModeSubscription: Subscription;

    constructor(private cashCategoriesService: CashCategoriesService) {}

    ngOnInit(): void {
        this.editModeSubscription = this.cashCategoriesService.editMode.subscribe((result) => {
            this.editMode = result;
        });
    }

    ngOnDestroy(): void {
        this.editModeSubscription.unsubscribe();
    }

    addNew() {
        //TODO: Implement method
    }

    toggleEditMode(editModeStatus: boolean) {
        this.cashCategoriesService.editMode.next(editModeStatus);
    }

    toggleStatus() {
        //TODO: Implement method
    }
}
