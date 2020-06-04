import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GlobalService } from '@app/_services/global.service';
import { Observable } from 'rxjs';

const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

@Injectable({
    providedIn: 'root'
})
export class CashService {
    private endpoint = `/cash.php`;

    constructor(private http: HttpClient, private globalService: GlobalService) {}

    public getAllLegacy(dateFrom: Moment, dateTo: Moment): Observable<any> {
        const params = new HttpParams()
            .set('action', 'getAll')
            .append('dateFrom', dateFrom.set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).format('YYYY-MM-DD+HH:mm:ss'))
            .append('dateUpTo', dateTo.set({ hour: 23, minute: 59, second: 59, millisecond: 999 }).format('YYYY-MM-DD+HH:mm:ss'));

        return this.http.get<any>(`${this.globalService.webApiUrl}${this.endpoint}`, { headers: headers, params: params });
    }
}
