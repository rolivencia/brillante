import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RepairService } from '@services/repair.service';
import { Repair } from '@models/repair';

@Injectable({
    providedIn: 'root',
})
export class RepairUpdateResolverService implements Resolve<Repair> {
    constructor(private repairService: RepairService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Repair> {
        const idAsString = route.paramMap.get('id');
        const id = idAsString ? parseInt(idAsString, 10) : 0;
        return this.repairService.getById(id);
    }
}
