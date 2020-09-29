import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GlobalService } from '@app/_services/global.service';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@app/_services/authentication.service';
import { Repair } from '@app/_models';
import { environment } from '@environments/environment';

const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

@Injectable({
    providedIn: 'root',
})
export class CashService {
    private endpoint = `/cash.php`;

    constructor(private authenticationService: AuthenticationService, private http: HttpClient, private globalService: GlobalService) {}

    public getAllLegacy(dateFrom: Moment, dateTo: Moment): Observable<any> {
        const params = new HttpParams()
            .set('action', 'getAll')
            .append('dateFrom', dateFrom.set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).format('YYYY-MM-DD+HH:mm:ss'))
            .append('dateUpTo', dateTo.set({ hour: 23, minute: 59, second: 59, millisecond: 999 }).format('YYYY-MM-DD+HH:mm:ss'));
        return this.http.get<any>(`${this.globalService.webApiUrl}${this.endpoint}`, { headers: headers, params: params });
    }

    public getAll(dateFrom: Moment, dateTo: Moment): Observable<any> {
        const params = new HttpParams()
            .set('startDate', `${dateFrom.format('YYYY-MM-DD')} 00:00:00`)
            .append('endDate', `${dateTo.format('YYYY-MM-DD')} 23:59:59`);
        return this.http.get<Repair>(`${environment.apiUrl}/cash`, { headers: headers, params: params });
    }

    public getByIdLegacy(id: number | string): Observable<any> {
        const params = new HttpParams().set('action', 'getById').append('transactionId', id.toString());
        return this.http.get<any>(`${this.globalService.webApiUrl}${this.endpoint}`, { headers: headers, params: params });
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

    public openCashRegisterLegacy() {
        return this.createLegacy({
            conceptId: 49,
            amount: 0,
            transactionTypeId: 1,
            note: 'Apertura de Caja',
            createdUserId: this.authenticationService.currentUserValue.id,
            entityId: null,
        });
    }

    // TODO: Finish implementation
    public updateLegacy(transaction): Observable<any> {
        return this.http.post<any>(
            `${this.globalService.webApiUrl}${this.endpoint}`,
            { ...transaction, action: 'update' },
            { headers: headers }
        );
    }

    public deleteLegacy(transactionId: number | string) {
        return this.http.post<any>(
            `${this.globalService.webApiUrl}${this.endpoint}`,
            { action: 'delete', transactionId: transactionId.toString() },
            { headers: headers }
        );
    }
}
