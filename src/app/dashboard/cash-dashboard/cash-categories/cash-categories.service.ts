import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { TransactionConcept } from '@app/_models/cash-transaction';

@Injectable({
    providedIn: 'root',
})
export class CashCategoriesService {
    get transactionConcepts(): TransactionConcept[] {
        return this._transactionConcepts;
    }

    get selectableTransactionConcepts(): TransactionConcept[] {
        return this._selectableTransactionConcepts;
    }

    private _transactionConcepts: TransactionConcept[] = [];
    private _selectableTransactionConcepts: TransactionConcept[] = [];

    constructor() {}

    initialize(concepts: TransactionConcept[]) {
        this._transactionConcepts = _.cloneDeep(concepts);

        const selectableParentTransactionConcepts: TransactionConcept[] = concepts.filter((parentConcept) => parentConcept.userAssignable);

        selectableParentTransactionConcepts.forEach((parentConcept) => {
            parentConcept.children = parentConcept.children.filter((childrenConcept) => childrenConcept.userAssignable);
        });

        this._selectableTransactionConcepts = [].concat(selectableParentTransactionConcepts);
    }
}
