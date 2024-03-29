import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { TransactionConcept, TransactionType } from '@models/cash-transaction';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class MoneyTransactionConceptsService {
    //region Getters & Setters
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

    get modifiableTransactionConcepts(): TransactionConcept[] {
        return this._modifiableTransactionConcepts;
    }
    //endregion

    private _transactionConcepts: TransactionConcept[] = [];
    private _modifiableTransactionConcepts: TransactionConcept[] = [];
    private _selectableTransactionConcepts: TransactionConcept[] = [];

    public addMode: BehaviorSubject<{ value: boolean } & { concept: TransactionConcept }> = new BehaviorSubject<
        { value: boolean } & { concept: TransactionConcept }
    >({
        value: false,
        concept: null,
    });

    public editMode: BehaviorSubject<{ value: boolean } & { concept: TransactionConcept }> = new BehaviorSubject<
        { value: boolean } & { concept: TransactionConcept }
    >({
        value: false,
        concept: null,
    });

    //TODO: See Issue #74. Refactor hardcoded transaction type handling.
    private _transactionTypes: TransactionType[] = [
        { id: 0, description: 'Egreso' },
        { id: 1, description: 'Ingreso' },
    ];

    transactionParentConcept: TransactionConcept;
    transactionConcept: TransactionConcept;

    private _saved: boolean = false;

    constructor(private http: HttpClient) {}

    public getConcepts(): Observable<TransactionConcept[]> {
        return this.http.get<TransactionConcept[]>(`${environment.apiUrl}/cash/transaction/get`);
    }

    public assign(concepts: TransactionConcept[]) {
        this._transactionConcepts = _.cloneDeep(concepts);

        const selectableParentTransactionConcepts: TransactionConcept[] = concepts.filter(
            (parentConcept) => parentConcept.userAssignable
        );

        selectableParentTransactionConcepts.forEach((parentConcept) => {
            parentConcept.children = parentConcept.children.filter((childrenConcept) => childrenConcept.userAssignable);
        });

        this._modifiableTransactionConcepts = [].concat(selectableParentTransactionConcepts);

        this._selectableTransactionConcepts = []
            .concat(selectableParentTransactionConcepts)
            .filter((parentConcept) => parentConcept.children.length > 0 && parentConcept.enabled);
    }

    public async reloadConcepts() {
        const response: TransactionConcept[] = await this.getConcepts().toPromise();
        this.assign(response);
    }

    updateTransactionType(updated: TransactionConcept) {
        this.transactionParentConcept.transactionType = _.cloneDeep(updated.transactionType);
    }

    log(toPrint) {
        console.log(toPrint);
    }
}
