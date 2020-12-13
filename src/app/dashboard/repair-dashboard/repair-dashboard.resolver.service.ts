import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { RepairStatus } from '../../_models';
import { RepairService } from '../../_services/repair.service';

@Injectable({
    providedIn: 'root',
})
export class RepairDashboardResolverService implements Resolve<RepairStatus[]> {
    constructor(public repairService: RepairService) {}

    async resolve(route: ActivatedRouteSnapshot): Promise<RepairStatus[]> {
        const concepts: RepairStatus[] = await this.repairService.getStatusData().toPromise();
        this.repairService.repairStatuses = [].concat(concepts);

        return new Promise((resolve, reject) => {
            if (concepts && concepts.length) {
                resolve(concepts);
            } else {
                console.error(Error);
                reject(Error);
            }
        });
    }
}
