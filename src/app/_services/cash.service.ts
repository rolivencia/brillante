import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@app/_services/authentication.service';
import { User } from '@app/_models';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';
import { CashTransaction, PaymentMethod, TransactionConcept } from '@app/_models/cash-transaction';
import { OfficeBranch } from '@app/_models/office-branch';
import { OfficeBranchService } from '@app/_services/office-branch.service';

const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

@Injectable({
    providedIn: 'root',
})
export class CashService {
    constructor(
        private authenticationService: AuthenticationService,
        private http: HttpClient,
        private officeBranchService: OfficeBranchService
    ) {}

    public getAll(dateFrom: Moment, dateTo: Moment, branch?: OfficeBranch): Observable<any> {
        let params = new HttpParams()
            .set('startDate', `${dateFrom.format('YYYY-MM-DD')} 00:00:00`)
            .append('endDate', `${dateTo.format('YYYY-MM-DD')} 23:59:59`);

        if (branch) {
            params = params.append('idBranch', `${branch.id}`);
        }

        return this.http
            .get<CashTransaction[]>(`${environment.apiUrl}/cash`, { headers: headers, params: params })
            .pipe(
                map((cashTransactionsDTO): CashTransaction[] =>
                    cashTransactionsDTO.map(
                        (cashTransactionDTO): CashTransaction => toCashTransaction(cashTransactionDTO)
                    )
                )
            );
    }

    public getById(id: number | string): Observable<any> {
        return this.http
            .get<CashTransaction>(`${environment.apiUrl}/cash/getById/${id}`)
            .pipe(map((cashTransactionDTO) => toCashTransaction(cashTransactionDTO)));
    }

    public remove(id: number | string): Observable<any> {
        return this.http.delete<any>(`${environment.apiUrl}/cash/remove/${id}`);
    }

    public create(transaction: CashTransaction, user: User): Observable<CashTransaction> {
        const currentBranch = this.officeBranchService.current.value;
        return this.http.post<CashTransaction>(`${environment.apiUrl}/cash/create`, {
            ...transaction,
            user,
            branch: currentBranch,
        });
    }

    public openCashRegister(user: User) {
        const currentBranch = this.officeBranchService.current.value;
        return this.http.post<CashTransaction>(`${environment.apiUrl}/cash/open`, {
            user: user,
            branch: currentBranch,
        });
    }

    // TODO: Finish implementation (add CronJob + Manual)
    public closeCashRegister() {
        const currentBranch = this.officeBranchService.current.value;
        return this.http.post<CashTransaction>(`${environment.apiUrl}/cash/close`, {
            branch: currentBranch,
        });
    }

    public update(transaction): Observable<[number]> {
        return this.http.put<[number]>(`${environment.apiUrl}/cash/update`, { ...transaction });
    }
}

export function toCashTransaction(cashTransactionDTO): CashTransaction {
    return {
        ...cashTransactionDTO,
        date: moment(cashTransactionDTO.date),
        amount: parseFloat(cashTransactionDTO.amount),
        paymentMethod: cashTransactionDTO.paymentMethod,
        payments: cashTransactionDTO.payments.map((payment) => ({ ...payment, amount: parseFloat(payment.amount) })),
        audit: {
            ...cashTransactionDTO.audit,
            createdAt: moment(cashTransactionDTO.audit.createdAt),
            updatedAt: moment(cashTransactionDTO.audit.updatedAt),
        },
    };
}
