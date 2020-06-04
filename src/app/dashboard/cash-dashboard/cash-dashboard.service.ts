import { Injectable, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { DateObject } from '@app/_models/date-object';
import * as moment from 'moment';
import { CollectionView } from 'wijmo/wijmo';
import { CashService } from '@app/_services/cash.service';
import { LegacyMapperService } from '@app/_services/legacy-mapper.service';
import { CashTransaction } from '@app/_models/cash-transaction';

@Injectable({
    providedIn: 'root'
})
export class CashDashboardService {
    public date: Moment = moment();
    public ngbDate: DateObject;
    public ngbMaxDate: DateObject;
    public transactions: CashTransaction[] = [];

    public gridCollection: CollectionView;

    constructor(public cashService: CashService, public legacyMapperService: LegacyMapperService) {
        this.gridCollection = new CollectionView([]);
        this.load(moment());
    }

    async load(date: Moment) {
        const dateFrom = moment(date);
        const dateTo = moment(date);
        const rawTransactions = await this.cashService.getAllLegacy(dateFrom, dateTo).toPromise();
        this.transactions = rawTransactions['data'].map(transaction => this.legacyMapperService.fromLegacyCashTransaction(transaction));
        console.log(this.transactions);
    }
}
