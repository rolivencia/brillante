import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { DateObject } from '@app/_models/date-object';
import * as moment from 'moment';
import { CollectionView } from 'wijmo/wijmo';

@Injectable({
    providedIn: 'root'
})
export class CashDashboardService {
    public date: Moment = moment();
    public ngbDate: DateObject;
    public ngbMaxDate: DateObject;

    public gridCollection: CollectionView;

    constructor() {
        this.gridCollection = new CollectionView([]);
    }
}
