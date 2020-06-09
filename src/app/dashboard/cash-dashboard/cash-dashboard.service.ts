import { Injectable, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { DateObject } from '@app/_models/date-object';
import * as moment from 'moment';
import { CollectionView, SortDescription } from 'wijmo/wijmo';
import { CashService } from '@app/_services/cash.service';
import { LegacyMapperService } from '@app/_services/legacy-mapper.service';
import { CashTransaction, TransactionType } from '@app/_models/cash-transaction';

@Injectable({
    providedIn: 'root'
})
export class CashDashboardService {
    get transactionTypes(): TransactionType[] {
        return this._transactionTypes;
    }

    public date: Moment = moment();
    public ngbDate: DateObject;
    public ngbMaxDate: DateObject;
    public transactions: CashTransaction[] = [];

    public gridCollection: CollectionView;
    public selectedTransaction: CashTransaction = null;

    private _transactionTypes: TransactionType[] = [
        { id: 0, description: 'Ingreso' },
        { id: 1, description: 'Egreso' }
    ];

    constructor(public cashService: CashService, public legacyMapperService: LegacyMapperService) {
        this.gridCollection = new CollectionView([]);
        this.load(moment());
        this.loadControls();
    }

    async load(date: Moment) {
        const dateFrom = moment(date);
        const dateTo = moment(date);
        const rawTransactions = await this.cashService.getAllLegacy(dateFrom, dateTo).toPromise();

        if (rawTransactions['data']?.length) {
            this.transactions = rawTransactions['data'].map(transaction => this.legacyMapperService.fromLegacyCashTransaction(transaction));
            this.gridCollection = new CollectionView<any>(this.transactions);
        }

        const sortById = new SortDescription('date', true);
        this.gridCollection.sortDescriptions.clear();
        this.gridCollection.sortDescriptions.push(sortById);
    }

    async loadControls() {
        const parentConcepts = await this.cashService.getConceptsLegacy(true).toPromise();
        const concepts = await this.cashService.getConceptsLegacy(false).toPromise();
    }

    loadChildrenConcepts() {}
}
