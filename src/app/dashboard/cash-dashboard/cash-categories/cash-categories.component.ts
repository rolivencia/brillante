import { Component, OnDestroy, OnInit } from '@angular/core';
import { CashFormHandlerService } from '@app/dashboard/cash-dashboard/cash-form-handler.service';
import { CashCategoriesService } from '@app/dashboard/cash-dashboard/cash-categories/cash-categories.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-cash-categories',
    templateUrl: './cash-categories.component.html',
    styleUrls: ['./cash-categories.component.scss'],
})
export class CashCategoriesComponent implements OnInit, OnDestroy {
    editMode: boolean = false;
    editModeSubscription: Subscription;
    constructor(public cashCategoriesService: CashCategoriesService, public cashFormHandlerService: CashFormHandlerService) {}

    ngOnInit(): void {
        this.cashCategoriesService.transactionParentConcept = this.cashCategoriesService.transactionConcepts.slice(0, 1).pop();
        this.cashCategoriesService.transactionConcept = this.cashCategoriesService.transactionParentConcept.children.slice(0, 1).pop();
        this.editModeSubscription = this.cashCategoriesService.editMode.subscribe((result) => {
            this.editMode = result;
        });
    }

    ngOnDestroy() {
        this.editModeSubscription.unsubscribe();
    }


}
