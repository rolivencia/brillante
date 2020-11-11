import { Component, OnInit } from '@angular/core';
import { CashFormHandlerService } from '@app/dashboard/cash-dashboard/cash-form-handler.service';
import { CashCategoriesService } from '@app/dashboard/cash-dashboard/cash-categories/cash-categories.service';

@Component({
    selector: 'app-cash-categories',
    templateUrl: './cash-categories.component.html',
    styleUrls: ['./cash-categories.component.scss'],
})
export class CashCategoriesComponent implements OnInit {
    constructor(public cashCategoriesService: CashCategoriesService, public cashFormHandlerService: CashFormHandlerService) {}

    ngOnInit(): void {
        this.cashFormHandlerService.transactionParentConcept = this.cashCategoriesService.selectableTransactionConcepts.slice(0, 1).pop();
    }
}
