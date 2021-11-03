import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { RepairStatus } from '../../_models';
import { RepairService } from '../../_services/repair.service';

@Injectable({
    providedIn: 'root',
})
export class RepairDashboardResolverService implements Resolve<RepairDashboardAssets> {
    constructor(public repairService: RepairService) {}

    async resolve(route: ActivatedRouteSnapshot): Promise<RepairDashboardAssets> {
        const repairStatuses: RepairStatus[] = await this.repairService.getStatusData().toPromise();

        this.repairService.repairStatuses = [].concat(repairStatuses);

        return new Promise((resolve, reject) => {
            if (repairStatuses && repairStatuses.length) {
                resolve({ repairStatuses: repairStatuses });
            } else {
                console.error(Error);
                reject(Error);
            }
        });
    }
}

export interface RepairDashboardAssets {
    repairStatuses: RepairStatus[];
}
