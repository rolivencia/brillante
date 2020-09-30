import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GlobalService } from '@app/_services/global.service';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@app/_services/authentication.service';
import { Repair } from '@app/_models';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';
import { CashTransaction } from '@app/_models/cash-transaction';
import { Customer } from '@app/_models/customer';

const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

@Injectable({
    providedIn: 'root',
})
export class CashService {
    private endpoint = `/cash.php`;

    constructor(private authenticationService: AuthenticationService, private http: HttpClient, private globalService: GlobalService) {}

    public getAll(dateFrom: Moment, dateTo: Moment): Observable<any> {
        const params = new HttpParams()
            .set('startDate', `${dateFrom.format('YYYY-MM-DD')} 00:00:00`)
            .append('endDate', `${dateTo.format('YYYY-MM-DD')} 23:59:59`);
        return this.http
            .get<CashTransaction[]>(`${environment.apiUrl}/cash`, { headers: headers, params: params })
            .pipe(
                map((cashTransactionsDTO): CashTransaction[] =>
                    cashTransactionsDTO.map((cashTransactionDTO): CashTransaction => toCashTransaction(cashTransactionDTO))
                )
            );
    }

    public getById(id: number | string): Observable<any> {
        return this.http
            .get<CashTransaction>(`${environment.apiUrl}/cash/${id}`)
            .pipe(map((cashTransactionDTO) => toCashTransaction(cashTransactionDTO)));
    }

    public remove(id: number | string): Observable<any> {
        return this.http.delete<any>(`${environment.apiUrl}/cash/remove/${id}`);
    }

    public getConcepts(): Observable<any> {
        return this.http.get<Repair>(`${environment.apiUrl}/cash/transaction/get`, { headers: headers });
    }

    // TODO: Finish implementation
    public createLegacy(transaction) {
        return this.http.post<any>(
            `${this.globalService.webApiUrl}${this.endpoint}`,
            { ...transaction, action: 'create' },
            { headers: headers }
        );
    }

    // TODO: Finish implementation
    public create(transaction): Observable<CashTransaction> {
        return this.http.post<CashTransaction>(`${environment.apiUrl}/cash/create`, { ...transaction });
    }

    public openCashRegister() {
        return this.http.post<CashTransaction>(`${environment.apiUrl}/cash/open`, {});
    }

    // TODO: Finish implementation (add CronJob + Manual)
    public closeCashRegister() {
        return this.http.post<CashTransaction>(`${environment.apiUrl}/cash/close`, {});
    }

    public update(transaction): Observable<[number]> {
        return this.http.put<[number]>(`${environment.apiUrl}/cash/update`, { ...transaction });
    }

    // TODO: Finish implementation
    public updateLegacy(transaction): Observable<any> {
        return this.http.post<any>(
            `${this.globalService.webApiUrl}${this.endpoint}`,
            { ...transaction, action: 'update' },
            { headers: headers }
        );
    }
}

export function toCashTransaction(cashTransactionDTO): CashTransaction {
    return {
        ...cashTransactionDTO,
        date: moment(cashTransactionDTO.date),
        amount: parseFloat(cashTransactionDTO.amount),
        audit: {
            ...cashTransactionDTO.audit,
            createdAt: moment(cashTransactionDTO.audit.createdAt),
            updatedAt: moment(cashTransactionDTO.audit.updatedAt),
        },
    };
}
