import { environment } from '@environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { format, parseISO } from 'date-fns';
import { map } from 'rxjs/operators';
import { DeviceType, Repair, RepairStatus } from '@models/repair';
import { User } from '@models/user';
import { OfficeBranchService } from '@services/office-branch.service';

const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

@Injectable({
    providedIn: 'root',
})
export class RepairService {
    //FIXME: #243 - Retrieve device types from database
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
        {
            id: 4,
            description: 'Smartwatch',
        },
        {
            id: 5,
            description: 'Parlantes',
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

    public getAllByDate(dateFrom: Date, dateTo: Date, showFinished: boolean = false): Observable<Repair[]> {
        const params = new HttpParams()
            .set('showFinished', showFinished.toString())
            .append('startDate', `${format(dateFrom, 'yyyy-MM-dd')} 00:00:00`)
            .append('endDate', `${format(dateTo, 'yyyy-MM-dd')} 23:59:59`);
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
                            ? format(parseISO(register.createdAt), 'yyyy/MM/dd HH:mm')
                            : register.createdAt,
                        updatedAt: register.updatedAt
                            ? format(parseISO(register.updatedAt), 'yyyy/MM/dd HH:mm')
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

    public updateTrackingInfo(repair: Repair, user: User, { generateTransaction }) {
        const currentBranch = this.officeBranchService.current.value;
        return this.http.put<any>(`${environment.apiUrl}/repair/updateTrackingInfo`, {
            repairToUpdate: repair,
            user: user,
            generateTransaction,
            officeBranch: currentBranch,
        });
    }

    public getStatusData(): Observable<RepairStatus[]> {
        return this.http.get<RepairStatus[]>(`${environment.apiUrl}/repair/getStatusData`);
    }

    public async load() {
        this.repairStatuses = await this.getStatusData().toPromise();
    }
}

export function toRepair(repairDTO): Repair {
    return {
        ...repairDTO,
        audit: {
            ...repairDTO.audit,
            createdBy: repairDTO.user,
            createdAt: repairDTO.audit.createdAt ? parseISO(repairDTO.audit.createdAt) : null,
            updatedAt: repairDTO.audit.createdAt ? parseISO(repairDTO.audit.createdAt) : null,
        },
        checkIn: repairDTO.checkIn ? parseISO(repairDTO.checkIn) : null,
        lastUpdate: repairDTO.lastUpdate ? parseISO(repairDTO.lastUpdate) : null,
        checkOut: repairDTO.checkOut ? parseISO(repairDTO.checkOut) : null,
        moneyTransactions: repairDTO.moneyTransactions
            ? repairDTO.moneyTransactions.map((x) => ({ ...x, date: x.date ? parseISO(x.date) : null }))
            : [],
    };
}

export function toRepairDTO(repair: Repair) {
    return {
        ...repair,
        audit: {
            ...repair.audit,
            createdAt: repair.audit.createdAt ? repair.audit.createdAt.toISOString() : new Date().toISOString(),
            updatedAt: repair.audit.updatedAt ? repair.audit.updatedAt.toISOString() : new Date().toISOString(),
        },
        checkIn: repair.checkIn ? repair.checkIn.toISOString() : new Date().toISOString(),
        lastUpdate: repair.lastUpdate ? repair.lastUpdate.toISOString() : new Date().toISOString(),
        checkOut: repair.checkOut ? repair.checkOut.toISOString() : null,
    };
}
