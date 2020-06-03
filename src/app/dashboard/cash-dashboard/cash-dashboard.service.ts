import { Injectable, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { DateObject } from '@app/_models/date-object';
import * as moment from 'moment';
import { CollectionView } from 'wijmo/wijmo';
import { CashService } from '@app/_services/cash.service';
import { LegacyMapperService } from '@app/_services/legacy-mapper.service';

@Injectable({
    providedIn: 'root'
})
export class CashDashboardService {
    public date: Moment = moment();
    public ngbDate: DateObject;
    public ngbMaxDate: DateObject;

    public gridCollection: CollectionView;

    constructor(public cashService: CashService, public legacyMapperService: LegacyMapperService) {
        this.gridCollection = new CollectionView([]);
        this.load();
    }

    async load() {
        const dateFrom = moment('2020-06-02');
        const dateTo = moment();
        const transactions = await this.cashService.getAllLegacy(dateFrom, dateTo).toPromise();
        console.log(transactions['data'].map(transaction => this.legacyMapperService.fromLegacyCashTransaction(transaction)));
    }
}
