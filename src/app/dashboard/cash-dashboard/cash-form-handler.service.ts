import { Injectable } from '@angular/core';
import { Operation, TransactionConcept, TransactionType } from '@app/_models/cash-transaction';

@Injectable({
    providedIn: 'root'
})
export class CashFormHandlerService {
    private _transactionTypes: TransactionType[] = [];
    private _transactionOperations: Operation[] = [];
    private _transactionConcept: TransactionConcept[] = [];

    constructor() {}
}
