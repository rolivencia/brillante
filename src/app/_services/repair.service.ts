import { environment } from '@environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { Moment } from 'moment';
import { map } from 'rxjs/operators';
import { DeviceType, Repair, RepairStatus } from '@models/repair';
import { User } from '@models/user';
import { OfficeBranchService } from '@services/office-branch.service';

const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

@Injectable({
    providedIn: 'root',
})
export class RepairService {
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

    public repairStatuses: RepairStatus[] = [];

    constructor(private http: HttpClient, private officeBranchService: OfficeBranchService) {}

    public getById(id: number): Observable<Repair> {
        return this.http
            .get<Repair>(`${environment.apiUrl}/repair/${id}`, { headers: headers })
            .pipe(map((repairDTO): Repair => toRepair(repairDTO)));
    }

    public getAll(showFinished: boolean): Observable<Repair[]> {
        const params = new HttpParams().set('showFinished', showFinished.toString());
        return this.http
            .get<Repair[]>(`${environment.apiUrl}/repair`, { headers: headers, params: params })
            .pipe(map((repairsDTO): Repair[] => repairsDTO.map((repairDTO): Repair => toRepair(repairDTO))));
    }

    public getAllByDate(showFinished: boolean, dateFrom: Moment, dateTo: Moment): Observable<Repair[]> {
        const params = new HttpParams()
            .set('showFinished', showFinished.toString())
            .append('startDate', `${dateFrom.format('YYYY-MM-DD')} 00:00:00`)
            .append('endDate', `${dateTo.format('YYYY-MM-DD')} 23:59:59`);
        return this.http
            .get<Repair[]>(`${environment.apiUrl}/repair/byDate`, { headers: headers, params: params })
            .pipe(map((repairsDTO): Repair[] => repairsDTO.map((repairDTO): Repair => toRepair(repairDTO))));
    }

    public getHistory(idRepair: number): Observable<any> {
        return this.http
            .get<any>(`${environment.apiUrl}/repair/history/${idRepair}`, { headers: headers })
            .pipe(
                map((historical) =>
                    historical.map((register) => ({
                        ...register,
                        createdAt: register.createdAt
                            ? moment(register.createdAt).format('YYYY/MM/DD HH:mm')
                            : register.createdAt,
                        updatedAt: register.updatedAt
                            ? moment(register.updatedAt).format('YYYY/MM/DD HH:mm')
                            : register.updatedAt,
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
        return this.http.delete<{ response: string }>(`${environment.apiUrl}/repair/remove/${id}`, {
            headers: headers,
        });
    }

    public create(repair: Repair, user: User) {
        return this.http.post<any>(`${environment.apiUrl}/repair/create`, {
            repairToCreate: toRepairDTO(repair),
            user: user,
        });
    }

    public updateDeviceInfo(repair: Repair) {
        return this.http.put<any>(`${environment.apiUrl}/repair/updateDeviceInfo`, { ...repair });
    }

    public updateTrackingInfo(repair: Repair, user: User, { generateTransaction, paymentMethod }) {
        const currentBranch = this.officeBranchService.current.value;
        return this.http.put<any>(`${environment.apiUrl}/repair/updateTrackingInfo`, {
            repairToUpdate: repair,
            user: user,
            generateTransaction,
            paymentMethod,
            officeBranch: currentBranch,
        });
    }

    public getStatusData(): Observable<RepairStatus[]> {
        return this.http.get<RepairStatus[]>(`${environment.apiUrl}/repair/getStatusData`);
    }
}

export function toRepair(repairDTO): Repair {
    return {
        ...repairDTO,
        audit: {
            ...repairDTO.audit,
            createdBy: repairDTO.user,
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
