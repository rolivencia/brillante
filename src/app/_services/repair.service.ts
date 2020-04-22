import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
import { DeviceType, RepairLegacy } from '@app/_models';
import { GlobalService } from '@app/_services/global.service';
import { environment } from '@environments/environment';

const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

@Injectable({
    providedIn: 'root'
})
export class RepairService {
    //FIXME: Cargar desde base de datos
    public deviceTypes: DeviceType[] = [
        {
            id: 0,
            description: 'Smartphone'
        },
        {
            id: 1,
            description: 'Tablet'
        },
        {
            id: 2,
            description: 'Laptop'
        },
        {
            id: 3,
            description: 'Escritorio'
        }
    ];

    private endpoint = `/reparacion.php`;

    constructor(private http: HttpClient, private globalService: GlobalService) {}

    public getByIdLegacy(id: number): Observable<RepairLegacy> {
        const params = new HttpParams().set('action', 'getById').append('repairId', id.toString());
        return this.http.get<RepairLegacy>(`${this.globalService.webApiUrl}${this.endpoint}`, { headers: headers, params: params });
    }

    public getAllLegacy(showFinished: boolean, dateFrom: Moment, dateTo: Moment) {
        const params = new HttpParams()
            .set('action', 'getAllByDate')
            .append('mostrarTerminadas', showFinished.toString())
            .append('fechaIngresoDesde', `${dateFrom.format('YYYY-MM-DD')} 00:00:00`)
            .append('fechaIngresoHasta', `${dateTo.format('YYYY-MM-DD')} 23:59:59`);

        return this.http.get<RepairLegacy>(`${this.globalService.webApiUrl}${this.endpoint}`, { headers: headers, params: params });
    }

    public getAll(showFinished: boolean, dateFrom: Moment, dateTo: Moment): Observable<any> {
        const params = new HttpParams()
            .set('showFinished', showFinished.toString())
            .append('startDate', `${dateFrom.format('YYYY-MM-DD')} 00:00:00`)
            .append('endDate', `${dateTo.format('YYYY-MM-DD')} 23:59:59`);

        return this.http.get<any>(`${environment.apiUrl}/repair`, { headers: headers, params: params });
    }

    public getByClientIdLegacy(clientId: number): Observable<RepairLegacy> {
        const params = new HttpParams().set('action', 'getByClientId').append('clientId', clientId.toString());
        return this.http.get<RepairLegacy>(`${this.globalService.webApiUrl}${this.endpoint}`, { headers: headers, params: params });
    }

    public getForUpdateById() {
        // TODO: Implement method
    }

    public delete(id: number): Observable<RepairLegacy> {
        const params = new HttpParams().set('action', 'delete').append('repairId', id.toString());
        return this.http.get<RepairLegacy>(`${this.globalService.webApiUrl}${this.endpoint}`, { headers: headers, params: params });
    }
}
