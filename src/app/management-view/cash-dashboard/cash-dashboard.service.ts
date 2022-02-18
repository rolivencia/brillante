import * as moment from 'moment';
import { Moment } from 'moment';
import { BehaviorSubject } from 'rxjs';
import { CashFormHandlerService } from '@management-view/cash-dashboard/cash-form-handler.service';
import { CashService } from '@services/cash.service';
import { CashTransaction } from '@models/cash-transaction';
import { CollectionView, SortDescription } from '@grapecity/wijmo';
import { DateObject } from '@models/date-object';
import { FlexGrid, GroupRow } from '@grapecity/wijmo.grid';
import { Injectable } from '@angular/core';
import { ProgressLoaderService } from '@components/progress-loader/progress-loader.service';
import { OfficeBranch } from '@models/office-branch';
import { OfficeBranchService } from '@services/office-branch.service';
import { Role } from '@models/user';
import { decimalsSeparator } from '@functions/numeric-utils';
import { AuthenticationService } from '@services/authentication.service';

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
    public data: any[] = [];
    public selectedTransaction: CashTransaction = null;

    constructor(
        public authenticationService: AuthenticationService,
        public cashService: CashService,
        private cashFormHandler: CashFormHandlerService,
        private officeBranchService: OfficeBranchService,
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
            this.loadData(moment());
        }
    }
    public gridData = [];
    // FIXME: Restructure this to get rid of coupling. Think of two methods: one for single date, other for starting and ending
    async refreshGrid(date?: DateObject) {
        this.date = date ? formatDate(date) : moment();
        await this.loadData(this.date, this.date, [], this.officeBranchService.current.value);
        this.selectedTransaction = null;
    }

    async loadData(from: Moment, to?: Moment, filterConcepts: any[] = [], officeBranch: OfficeBranch = null) {
        // TODO: Return transactions to display them where desired
        this.loading.next(true);
        this.progressLoaderService.showWithOverlay();

        const dateFrom = moment(from);
        const dateTo = to ? moment(to) : moment(from);

        const transactions = await this.cashService.getAll(dateFrom, dateTo, officeBranch).toPromise();
        this.transactions = transactions.map((Transaction) => mapTransactionType(Transaction));

        if (filterConcepts.length) {
            this.transactions = this.transactions.filter(
                (transaction) => !filterConcepts.includes(transaction.concept.id)
            );
        }
        // Wijmo Version
        this.gridCollection = new CollectionView<any>(this.transactions);
        this.gridCollection.currentItem = null;

        // SyncFusion version
        this.gridData = this.transactions.map((t) => ({ ...t, date: t.date.format('YYYY-MM-DD HH:mm') }));

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

    // TODO: Refactor import
    decimalSeparatorParser(x) {
        return decimalsSeparator(x);
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

export function formatDate(date: DateObject) {
    const dateString = `${date.year}-${date.month}-${date.day}`;
    return moment(dateString);
}

export const isAdministrator = (roles: Role[]): boolean => roles.filter((role) => role.id === 1).length > 0;
