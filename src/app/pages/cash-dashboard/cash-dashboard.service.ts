import { BehaviorSubject } from 'rxjs';
import { CashService } from '@services/cash.service';
import { CashTransaction } from '@models/cash-transaction';
import { DateObject } from '@models/date-object';
import { Injectable } from '@angular/core';
import { ProgressLoaderService } from '@components/progress-loader/progress-loader.service';
import { OfficeBranch } from '@models/office-branch';
import { OfficeBranchService } from '@services/office-branch.service';
import { Role } from '@models/user';
import { decimalsSeparator } from '@functions/numeric-utils';
import { AuthenticationService } from '@services/authentication.service';
import { subDays, getYear, getMonth, getDate } from 'date-fns';

@Injectable({
    providedIn: 'root',
})
export class CashDashboardService {
    public gridData: CashTransaction[] = [];
    public editMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    // TODO: Issue #98 - Limit how many days can an employee with access to the cash register can see in the past. Make it configurable.
    public date: Date = new Date();
    public minimumGridDate: Date = subDays(new Date(), 14);

    public ngbDateFrom: DateObject;
    public ngbDateTo: DateObject;

    public ngbMinDate: DateObject = {
        year: getYear(this.minimumGridDate),
        month: (getMonth(this.minimumGridDate) + 1) % 13,
        day: getDate(this.minimumGridDate),
    };

    public ngbMaxDate: DateObject = {
        year: getYear(this.date),
        month: (getMonth(this.date) + 1) % 13,
        day: getDate(this.date),
    };

    public ngbSystemInitialDate: DateObject = { year: 2020, month: 8, day: 1 };
    public ngbSystemMaxDate: DateObject = {
        year: getYear(this.date),
        month: (getMonth(this.date) + 1) % 13,
        day: getDate(this.date),
    };

    public transactions: CashTransaction[] = [];

    public data: any[] = [];
    public selectedTransaction: CashTransaction = null;

    constructor(
        public authenticationService: AuthenticationService,
        public cashService: CashService,
        private officeBranchService: OfficeBranchService,
        private progressLoaderService: ProgressLoaderService
    ) {}

    isToday() {
        const currentDateTime = new Date();
        return (
            getYear(currentDateTime) === getYear(this.date) &&
            getMonth(currentDateTime) === getMonth(this.date) &&
            getDate(currentDateTime) === getDate(this.date)
        );
    }

    ngbMinDateByRole(): DateObject {
        const userRoles: any = this.authenticationService.currentUserValue.roles;
        let minimumGridDate: DateObject = {
            year: getYear(this.minimumGridDate),
            month: (getMonth(this.minimumGridDate) + 1) % 13,
            day: getDate(this.minimumGridDate),
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
            this.loadData(new Date());
        }
    }

    // FIXME: Restructure this to get rid of coupling. Think of two methods: one for single date, other for starting and ending
    async refreshGrid(date?: DateObject) {
        this.date = date ? formatDate(date) : new Date();
        await this.loadData(this.date, this.date, [], this.officeBranchService.current.value);
        this.selectedTransaction = null;
    }

    async loadData(from: Date, to?: Date, filterConcepts: any[] = [], officeBranch: OfficeBranch = null) {
        // TODO: Return transactions to display them where desired
        this.loading.next(true);
        this.progressLoaderService.showWithOverlay();

        const dateFrom = from;
        const dateTo = to ? to : from;

        const transactions = await this.cashService.getAll(dateFrom, dateTo, officeBranch).toPromise();
        this.transactions = transactions.map((Transaction) => mapTransactionType(Transaction));

        if (filterConcepts.length) {
            this.transactions = this.transactions.filter(
                (transaction) => !filterConcepts.includes(transaction.concept.id)
            );
        }

        this.gridData = this.transactions;

        this.progressLoaderService.hide();
        this.loading.next(false);
    }

    setTodayDate() {
        const today = new Date();
        this.ngbDateFrom = { year: getYear(today), month: (getMonth(today) + 1) % 13, day: getDate(today) };
        this.ngbDateTo = { year: getYear(today), month: (getMonth(today) + 1) % 13, day: getDate(today) };
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

export function formatDate(date: DateObject): Date {
    const dateString = `${date.year}-${date.month}-${date.day}`;
    return new Date(dateString);
}

export const isAdministrator = (roles: Role[]): boolean => roles.filter((role) => role.id === 1).length > 0;
