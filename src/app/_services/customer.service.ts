import { Injectable } from '@angular/core';
import { GlobalService } from '@app/_services/global.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import { RepairLegacy } from '@app/_models';

const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

@Injectable({
    providedIn: 'root',
})
export class CustomerService {
    private endpoint = `/cliente.php`;

    constructor(private http: HttpClient, private globalService: GlobalService) {}

    public getAll(offset?: number, limit?: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/client/getAll/${offset}/${limit}`);
    }

    public getById(id: number | string): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/client/getById/${id}`);
    }

    public getByDni(dni: number | string): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/client/getByDni/${dni}`);
    }

    /**
     * @deprecated
     * @param legacyCustomer - Legacy Cliente Object (wp-brillante)
     */
    public createLegacy(legacyCustomer) {
        return this.http.post<any>(
            `${this.globalService.webApiUrl}${this.endpoint}`,
            { ...legacyCustomer, action: 'create' },
            { headers: headers }
        );
    }
}
