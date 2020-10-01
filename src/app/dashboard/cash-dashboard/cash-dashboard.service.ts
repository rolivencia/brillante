import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { CashFormHandlerService } from '@app/dashboard/cash-dashboard/cash-form-handler.service';
import { CashService } from '@app/_services/cash.service';
import { CashTransaction } from '@app/_models/cash-transaction';
import { CollectionView, SortDescription } from '@grapecity/wijmo';
import { DateObject } from '@app/_models/date-object';
import { FlexGrid, GroupRow } from '@grapecity/wijmo.grid';
import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { ProgressLoaderService } from '@app/_components/progress-loader/progress-loader.service';

@Injectable({
    providedIn: 'root',
})
export class CashDashboardService {
    public editMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public loading: boolean = false;
    public date: Moment = moment();

    public ngbDateFrom: DateObject;
    public ngbDateTo: DateObject;

    public ngbMinDate: DateObject = { year: 2020, month: 8, day: 1 };
    public ngbMaxDate: DateObject = { year: this.date.year(), month: (this.date.month() + 1) % 13, day: this.date.date() };
    public transactions: CashTransaction[] = [];

    public gridCollection: CollectionView = new CollectionView([]);
    public selectedTransaction: CashTransaction = null;

    constructor(
        public cashService: CashService,
        private cashFormHandler: CashFormHandlerService,
        private progressLoaderService: ProgressLoaderService
    ) {}

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
        const result = await this.cashService.openCashRegister().toPromise();
        if (result && result.id) {
            this.load(moment());
        }
    }

    async load(from: Moment, to?: Moment) {
        this.loading = true;
        this.progressLoaderService.showWithOverlay();

        const dateFrom = moment(from);
        const dateTo = to ? moment(to) : moment(from);

        const transactions = await this.cashService.getAll(dateFrom, dateTo).toPromise();
        this.transactions = transactions.map((Transaction) => mapTransactionType(Transaction));

        this.gridCollection = new CollectionView<any>(this.transactions);
        this.gridCollection.currentItem = null;

        const sortById = new SortDescription('date', true);
        this.gridCollection.sortDescriptions.clear();
        this.gridCollection.sortDescriptions.push(sortById);
        this.progressLoaderService.hide();
        this.loading = false;
    }

    setTodayDate() {
        this.ngbDateFrom = { year: moment().year(), month: (moment().month() + 1) % 13, day: moment().date() };
        this.ngbDateTo = { year: moment().year(), month: (moment().month() + 1) % 13, day: moment().date() };
    }

    initializeGrid(flex: FlexGrid) {
        flex.columnFooters.rows.push(new GroupRow());
        flex.bottomLeftCells.setCellData(0, 0, '$');
    }
}

export function mapTransactionType(transaction: CashTransaction) {
    const isIncome = transaction.concept.transactionType.id === 1;
    const isExpense = transaction.concept.transactionType.id === 0;
    return {
        ...transaction,
        amount: isIncome ? transaction.amount : -1 * transaction.amount,
        income: isIncome ? transaction.amount : 0,
        expense: isExpense ? transaction.amount : 0,
    };
}

//FIXME: Move this method to a service
export function formatDate(date: DateObject) {
    const dateString = `${date.year}-${date.month}-${date.day}`;
    return moment(dateString);
}
