import { Injectable } from '@angular/core';
import { GlobalService } from '@app/_services/global.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import { RepairLegacy } from '@app/_models';

const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    private endpoint = `/cliente.php`;

    constructor(private http: HttpClient, private globalService: GlobalService) {}

    public getAll(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/client`);
    }

    public getById(id: number | string): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/client/${id}`);
    }

    // Legacy methods

    public getByIdLegacy(id: number | string): Observable<any> {
        const params = new HttpParams().set('action', 'getByClientId').append('clientId', id.toString());
        return this.http.get<RepairLegacy>(`${this.globalService.webApiUrl}${this.endpoint}`, { headers: headers, params: params });
    }

    public getByDniLegacy(dni: number | string): Observable<any> {
        const params = new HttpParams().set('action', 'getByDni').append('dni', dni.toString());
        return this.http.get<RepairLegacy>(`${this.globalService.webApiUrl}${this.endpoint}`, { headers: headers, params: params });
    }

    /**
     * @deprecated
     * @param legacyCustomer - Legacy Cliente Object (wp-brillante)
     */
    public createLegacy(legacyCustomer) {
        const params = new HttpParams().set('action', 'create');
        return this.http.post<any>(`${this.globalService.webApiUrl}${this.endpoint}`, legacyCustomer, { headers: headers, params: params });
    }
}
