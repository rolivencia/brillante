import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { TransactionConcept, TransactionType } from '@app/_models/cash-transaction';
import { Behavior } from 'popper.js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CashCategoriesService {
    get saved(): boolean {
        return this._saved;
    }

    set saved(value: boolean) {
        this._saved = value;
    }
    get transactionTypes(): TransactionType[] {
        return this._transactionTypes;
    }
    get transactionConcepts(): TransactionConcept[] {
        return this._transactionConcepts;
    }

    get selectableTransactionConcepts(): TransactionConcept[] {
        return this._selectableTransactionConcepts;
    }

    private _transactionConcepts: TransactionConcept[] = [];
    private _selectableTransactionConcepts: TransactionConcept[] = [];

    public editMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    //TODO: See Issue #74. Refactor hardcoded transaction type handling.
    private _transactionTypes: TransactionType[] = [
        { id: 0, description: 'Egreso' },
        { id: 1, description: 'Ingreso' },
    ];

    transactionParentConcept: TransactionConcept;
    transactionConcept: TransactionConcept;

    private _saved: boolean = false;

    constructor() {}

    initialize(concepts: TransactionConcept[]) {
        this._transactionConcepts = _.cloneDeep(concepts);

        const selectableParentTransactionConcepts: TransactionConcept[] = concepts.filter((parentConcept) => parentConcept.userAssignable);

        selectableParentTransactionConcepts.forEach((parentConcept) => {
            parentConcept.children = parentConcept.children.filter((childrenConcept) => childrenConcept.userAssignable);
        });

        this._selectableTransactionConcepts = [].concat(selectableParentTransactionConcepts);
    }

    updateTransactionType(updated: TransactionConcept) {
        this.transactionParentConcept.transactionType = _.cloneDeep(updated.transactionType);
    }

    log(toPrint) {
        console.log(toPrint);
    }
}
