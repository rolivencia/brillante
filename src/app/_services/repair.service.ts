import { DeviceType, Repair, RepairLegacy, RepairStatus } from '@app/_models';
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
    providedIn: 'root',
})
export class RepairService {
    private endpoint = `/reparacion.php`;

    //FIXME: Cargar desde base de datos
    public deviceTypes: DeviceType[] = [
        {
            id: 0,
            description: 'Smartphone',
        },
        {
            id: 1,
            description: 'Tablet',
        },
        {
            id: 2,
            description: 'Laptop',
        },
        {
            id: 3,
            description: 'Escritorio',
        },
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
        { id: 7, description: 'Devuelto sin reparar' },
    ];

    constructor(private http: HttpClient, private globalService: GlobalService) {}

    public getById(id: number): Observable<Repair> {
        return this.http
            .get<Repair>(`${environment.apiUrl}/repair/${id}`, { headers: headers })
            .pipe(map((repairDTO): Repair => toRepair(repairDTO)));
    }

    public getAll(showFinished: boolean, dateFrom: Moment, dateTo: Moment): Observable<Repair[]> {
        const params = new HttpParams()
            .set('showFinished', showFinished.toString())
            .append('startDate', `${dateFrom.format('YYYY-MM-DD')} 00:00:00`)
            .append('endDate', `${dateTo.format('YYYY-MM-DD')} 23:59:59`);
        return this.http
            .get<Repair[]>(`${environment.apiUrl}/repair`, { headers: headers, params: params })
            .pipe(map((repairsDTO): Repair[] => repairsDTO.map((repairDTO): Repair => toRepair(repairDTO))));
    }

    public getHistory(idRepair: number): Observable<any> {
        return this.http
            .get<any>(`${environment.apiUrl}/repair/history/${idRepair}`, { headers: headers })
            .pipe(
                map((historical) =>
                    historical.map((register) => ({
                        ...register,
                        createdAt: register.createdAt ? moment(register.createdAt).format('YYYY/MM/DD HH:mm') : register.createdAt,
                        updatedAt: register.updatedAt ? moment(register.updatedAt).format('YYYY/MM/DD HH:mm') : register.updatedAt,
                    }))
                )
            );
    }

    public getByClientId(clientId: number): Observable<Repair[]> {
        return this.http
            .get<Repair[]>(`${environment.apiUrl}/repair/getByClientId/${clientId}`, { headers: headers })
            .pipe(map((repairsDTO): Repair[] => repairsDTO.map((repairDTO): Repair => toRepair(repairDTO))));
    }

    public getForUpdateById() {
        // TODO: Implement method
    }

    public delete(id: number): Observable<{ response: string }> {
        return this.http.get<{ response: string }>(`${environment.apiUrl}/repair/remove/${id}`, { headers: headers });
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

export function toRepair(repairDTO): Repair {
    const { checkIn, lastUpdate, checkOut, ...destructuredRepair } = repairDTO;
    return {
        ...destructuredRepair,
        audit: {
            ...destructuredRepair.audit,
            createdAt: moment(destructuredRepair.audit.createdAt),
            updatedAt: moment(destructuredRepair.audit.createdAt),
        },
        checkIn: moment(checkIn),
        lastUpdate: moment(lastUpdate),
        checkOut: checkOut ? moment(checkOut) : checkOut,
    };
}
