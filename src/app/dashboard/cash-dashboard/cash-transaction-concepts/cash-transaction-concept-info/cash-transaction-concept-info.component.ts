import { Component, Input, OnInit } from '@angular/core';
import { TransactionConcept } from '@app/_models/cash-transaction';

@Component({
    selector: 'app-cash-transaction-concept-info',
    templateUrl: './cash-transaction-concept-info.component.html',
    styleUrls: ['./cash-transaction-concept-info.component.scss'],
})
export class CashTransactionConceptInfoComponent implements OnInit {
    @Input() concept: TransactionConcept;
    @Input() label: string = '';

    constructor() {}

    ngOnInit(): void {}
}
