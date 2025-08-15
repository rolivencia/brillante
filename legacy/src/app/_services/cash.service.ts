import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { format, parseISO } from 'date-fns';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { CashTransaction } from '@models/cash-transaction';
import { OfficeBranch } from '@models/office-branch';
import { OfficeBranchService } from '@services/office-branch.service';
import { User } from '@models/user';

const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

@Injectable({
    providedIn: 'root',
})
export class CashService {
    constructor(private http: HttpClient, private officeBranchService: OfficeBranchService) {}

    public getAll(dateFrom: Date, dateTo: Date, branch?: OfficeBranch): Observable<any> {
        let params = new HttpParams()
            .set('startDate', `${format(dateFrom.toISOString(), 'yyyy-MM-dd')} 00:00:00`)
            .append('endDate', `${format(dateTo.toISOString(), 'yyyy-MM-dd')} 23:59:59`);

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

    public update(transaction: CashTransaction, user: User): Observable<[number]> {
        return this.http.put<[number]>(`${environment.apiUrl}/cash/update`, { transaction: transaction, user: user });
    }
}

export function toCashTransaction(cashTransactionDTO): CashTransaction {
    return {
        ...cashTransactionDTO,
        date: parseISO(cashTransactionDTO.date),
        amount: parseFloat(cashTransactionDTO.amount),
        paymentMethod: cashTransactionDTO.paymentMethod,
        payments: cashTransactionDTO.payments.map((payment) => ({ ...payment, amount: parseFloat(payment.amount) })),
        audit: {
            ...cashTransactionDTO.audit,
            createdAt: parseISO(cashTransactionDTO.audit.createdAt),
            updatedAt: parseISO(cashTransactionDTO.audit.updatedAt),
        },
    };
}
