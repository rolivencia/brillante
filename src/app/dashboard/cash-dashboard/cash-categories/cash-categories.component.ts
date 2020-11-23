import { Component, OnInit } from '@angular/core';
import { CashCategoriesService } from '@app/dashboard/cash-dashboard/cash-categories/cash-categories.service';

@Component({
    selector: 'app-cash-categories',
    templateUrl: './cash-categories.component.html',
    styleUrls: ['./cash-categories.component.scss'],
})
export class CashCategoriesComponent implements OnInit {
    constructor(public cashCategoriesService: CashCategoriesService) {}

    ngOnInit(): void {
        this.cashCategoriesService.transactionParentConcept = this.cashCategoriesService.transactionConcepts
            .slice(0, 1)
            .pop();
        this.cashCategoriesService.transactionConcept = this.cashCategoriesService.transactionParentConcept.children
            .slice(0, 1)
            .pop();
    }

    changeParentConcept(event) {
        this.cashCategoriesService.transactionParentConcept = event;
    }

    changeSelectedConcept(event) {
        this.cashCategoriesService.transactionConcept = event;
    }
}
