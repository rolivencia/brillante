import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GlobalService } from '@app/_services/global.service';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@app/_services/authentication.service';

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

    public getByIdLegacy(id: number | string): Observable<any> {
        const params = new HttpParams().set('action', 'getById').append('transactionId', id.toString());
        return this.http.get<any>(`${this.globalService.webApiUrl}${this.endpoint}`, { headers: headers, params: params });
    }

    public getConceptsLegacy(getParents: boolean = false): Observable<any> {
        const params = new HttpParams().set('action', 'getTransactionConcepts').append('getParents', getParents.toString());
        return this.http.get<any>(`${this.globalService.webApiUrl}${this.endpoint}`, { headers: headers, params: params });
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
    public updateLegacy() {
        return this.http.post<any>(`${this.globalService.webApiUrl}${this.endpoint}`, { action: 'update' }, { headers: headers });
    }

    public deleteLegacy(transactionId: number | string) {
        return this.http.post<any>(
            `${this.globalService.webApiUrl}${this.endpoint}`,
            { action: 'delete', transactionId: transactionId.toString() },
            { headers: headers }
        );
    }
}
