import { Component, OnInit } from '@angular/core';
import { CashFormHandlerService } from '@app/dashboard/cash-dashboard/cash-form-handler.service';

@Component({
    selector: 'app-cash-categories',
    templateUrl: './cash-categories.component.html',
    styleUrls: ['./cash-categories.component.scss'],
})
export class CashCategoriesComponent implements OnInit {
    constructor(public cashFormHandlerService: CashFormHandlerService) {}

    ngOnInit(): void {}
}
