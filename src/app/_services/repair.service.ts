import { DeviceType, RepairLegacy, RepairStatus } from '@app/_models';
import { environment } from '@environments/environment';
import { GlobalService } from '@app/_services/global.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { Moment } from 'moment';
import { map } from 'rxjs/operators';

const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

@Injectable({
    providedIn: 'root'
})
export class RepairService {
    private endpoint = `/reparacion.php`;

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

    //FIXME: Cargar desde base de datos
    public repairStatuses: RepairStatus[] = [
        { id: 0, description: 'Ingresada al Sistema' },
        { id: 1, description: 'En proceso' },
        { id: 2, description: 'Esperando por repuestos' },
        { id: 3, description: 'Requiere intervención del cliente (Comunicarse con Brillante)' },
        { id: 4, description: 'Listo para entrega' },
        { id: 5, description: 'Finalizada y abonada' },
        { id: 6, description: 'Reingresado' },
        { id: 7, description: 'Devuelto sin reparar' }
    ];

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

    public getHistory(idRepair: number): Observable<any> {
        return this.http
            .get<any>(`${environment.apiUrl}/repair/history/${idRepair}`, { headers: headers })
            .pipe(
                map(historical =>
                    historical.map(register => ({
                        ...register,
                        createdAt: register.createdAt ? moment(register.createdAt).format('YYYY/MM/DD HH:mm') : register.createdAt,
                        updatedAt: register.updatedAt ? moment(register.updatedAt).format('YYYY/MM/DD HH:mm') : register.updatedAt
                    }))
                )
            );
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

    /**
     * @deprecated
     * @param legacyRepair - Legacy Repair Object (wp-brillante)
     */
    public createLegacy(legacyRepair) {
        return this.http.post<any>(
            `${this.globalService.webApiUrl}${this.endpoint}`,
            { ...legacyRepair, action: 'create' },
            { headers: headers }
        );
    }

    public updateLegacy(partialRepair) {
        return this.http.post<any>(
            `${this.globalService.webApiUrl}${this.endpoint}`,

            { ...partialRepair, action: 'updateTracking' },
            { headers: headers }
        );
    }

    public updateDescriptionLegacy(partialRepair) {
        return this.http.post<any>(
            `${this.globalService.webApiUrl}${this.endpoint}`,

            { ...partialRepair, action: 'updateRepairDescription' },
            { headers: headers }
        );
    }
}
