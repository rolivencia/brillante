import * as moment from 'moment';
import { Moment } from 'moment';
import { CashService } from '@app/_services/cash.service';
import { CashTransaction } from '@app/_models/cash-transaction';
import { CollectionView, SortDescription } from '@grapecity/wijmo';
import { DateObject } from '@app/_models/date-object';
import { Injectable } from '@angular/core';
import { LegacyMapperService } from '@app/_services/legacy-mapper.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CashDashboardService {
    public editMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public loading: boolean = false;
    public date: Moment = moment();
    public ngbDate: DateObject;
    public ngbMaxDate: DateObject = { year: this.date.year(), month: (this.date.month() + 1) % 13, day: this.date.date() };
    public transactions: CashTransaction[] = [];

    public gridCollection: CollectionView = new CollectionView([]);
    public selectedTransaction: CashTransaction = null;

    constructor(public cashService: CashService, public legacyMapperService: LegacyMapperService) {}

    isToday() {
        const currentDateTime = moment();
        return (
            currentDateTime.year() === this.date.year() &&
            currentDateTime.month() === this.date.month() &&
            currentDateTime.date() === this.date.date()
        );
    }

    async openCashRegister() {
        // TODO: Replace for new NodeJS API
        const result = await this.cashService.openCashRegisterLegacy().toPromise();
        if (result) {
            this.load(moment());
        }
    }

    async load(date: Moment) {
        this.loading = true;

        const dateFrom = moment(date);
        const dateTo = moment(date);
        const rawTransactions = await this.cashService.getAllLegacy(dateFrom, dateTo).toPromise();

        if (rawTransactions['data']?.length) {
            this.transactions = rawTransactions['data'].map((transaction) =>
                this.legacyMapperService.fromLegacyCashTransaction(transaction)
            );
        } else {
            this.transactions = [];
        }
        this.gridCollection = new CollectionView<any>(this.transactions);

        const sortById = new SortDescription('date', true);
        this.gridCollection.sortDescriptions.clear();
        this.gridCollection.sortDescriptions.push(sortById);
        this.loading = false;
    }
}
