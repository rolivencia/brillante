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

    public delete(id: number): Observable<{ response: string }> {
        return this.http.delete<{ response: string }>(`${environment.apiUrl}/repair/remove/${id}`, { headers: headers });
    }

    public create(repair: Repair) {
        return this.http.post<any>(`${environment.apiUrl}/repair/create`, { ...toRepairDTO(repair) });
    }

    public updateLegacy(partialRepair) {
        return this.http.post<any>(
            `${this.globalService.webApiUrl}${this.endpoint}`,

            { ...partialRepair, action: 'updateTracking' },
            { headers: headers }
        );
    }

    public updateDeviceInfo(repair: Repair) {
        return this.http.put<any>(`${environment.apiUrl}/repair/updateDeviceInfo`, { ...repair });
    }
}

/**
 * @param repairDTO
 */
export function toRepair(repairDTO): Repair {
    return {
        ...repairDTO,
        audit: {
            ...repairDTO.audit,
            createdAt: moment(repairDTO.audit.createdAt),
            updatedAt: moment(repairDTO.audit.createdAt),
        },
        checkIn: moment(repairDTO.checkIn),
        lastUpdate: moment(repairDTO.lastUpdate),
        checkOut: repairDTO.checkOut ? moment(repairDTO.checkOut) : repairDTO.checkOut,
    };
}

export function toRepairDTO(repair: Repair) {
    return {
        ...repair,
        audit: {
            ...repair.audit,
            createdAt: repair.audit.createdAt ? repair.audit.createdAt.toISOString() : moment().toISOString(),
            updatedAt: repair.audit.updatedAt ? repair.audit.updatedAt.toISOString() : moment().toISOString(),
        },
        checkIn: repair.checkIn ? repair.checkIn.toISOString() : moment().toISOString(),
        lastUpdate: repair.checkOut ? repair.checkOut.toISOString() : moment().toISOString(),
        checkOut: repair.checkOut ? repair.checkOut.toISOString : null,
    };
}
