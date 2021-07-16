import * as moment from 'moment';
import { Moment } from 'moment';
import { BehaviorSubject } from 'rxjs';
import { CashFormHandlerService } from '@app/dashboard/cash-dashboard/cash-form-handler.service';
import { CashService } from '@app/_services/cash.service';
import { CashTransaction } from '@app/_models/cash-transaction';
import { CollectionView, SortDescription } from '@grapecity/wijmo';
import { DateObject } from '@app/_models/date-object';
import { FlexGrid, GroupRow } from '@grapecity/wijmo.grid';
import { Injectable } from '@angular/core';
import { ProgressLoaderService } from '@app/_components/progress-loader/progress-loader.service';
import { AuthenticationService } from '@app/_services';
import { EUSerRoles } from '@app/_enums/user.enum';
import { Role } from '@app/_models';

@Injectable({
    providedIn: 'root',
})
export class CashDashboardService {
    public editMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    // TODO: Issue #98 - Limit how many days can an employee with access to the cash register can see in the past. Make it configurable.
    public date: Moment = moment();
    public minimumGridDate: Moment = moment().subtract(14, 'days');

    public ngbDateFrom: DateObject;
    public ngbDateTo: DateObject;

    public ngbMinDate: DateObject = {
        year: this.minimumGridDate.year(),
        month: (this.minimumGridDate.month() + 1) % 13,
        day: this.minimumGridDate.date(),
    };

    public ngbMaxDate: DateObject = {
        year: this.date.year(),
        month: (this.date.month() + 1) % 13,
        day: this.date.date(),
    };

    public ngbSystemInitialDate: DateObject = { year: 2020, month: 8, day: 1 };
    public ngbSystemMaxDate: DateObject = {
        year: this.date.year(),
        month: (this.date.month() + 1) % 13,
        day: this.date.date(),
    };

    public transactions: CashTransaction[] = [];

    public gridCollection: CollectionView = new CollectionView([]);
    public selectedTransaction: CashTransaction = null;

    constructor(
        public authenticationService: AuthenticationService,
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

    ngbMinDateByRole(): DateObject {
        const userRoles: any = this.authenticationService.currentUserValue.roles;
        let minimumGridDate: DateObject = {
            year: this.minimumGridDate.year(),
            month: (this.minimumGridDate.month() + 1) % 13,
            day: this.minimumGridDate.date(),
        };
        if (isAdministrator(userRoles)) {
            minimumGridDate = {
                year: 2016,
                month: 1,
                day: 1,
            };
        }
        return {
            year: minimumGridDate.year,
            month: minimumGridDate.month,
            day: minimumGridDate.day,
        };
    }

    async openCashRegister() {
        // TODO: Replace for new NodeJS API
        const result = await this.cashService.openCashRegister(this.authenticationService.currentUserValue).toPromise();
        if (result && result.id) {
            this.load(moment());
        }
    }

    async load(from: Moment, to?: Moment, filterConcepts: any[] = []) {
        // TODO: Return transactions to display them where desired
        this.loading.next(true);
        this.progressLoaderService.showWithOverlay();

        const dateFrom = moment(from);
        const dateTo = to ? moment(to) : moment(from);

        const transactions = await this.cashService.getAll(dateFrom, dateTo).toPromise();
        this.transactions = transactions.map((Transaction) => mapTransactionType(Transaction));

        if (filterConcepts.length) {
            this.transactions = this.transactions.filter(
                (transaction) => !filterConcepts.includes(transaction.concept.id)
            );
        }

        this.gridCollection = new CollectionView<any>(this.transactions);
        this.gridCollection.currentItem = null;

        const sortById = new SortDescription('date', true);
        this.gridCollection.sortDescriptions.clear();
        this.gridCollection.sortDescriptions.push(sortById);
        this.progressLoaderService.hide();
        this.loading.next(false);
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

export const isAdministrator = (roles: Role[]): boolean => roles.filter((role) => role.id === 1).length > 0;
