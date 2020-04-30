import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RepairLegacy } from '@app/_models';
import { RepairService } from '@app/_services/repair.service';
import { CustomerService } from '@app/_services/customer.service';

@Injectable({
    providedIn: 'root'
})
export class RepairUpdateResolverService implements Resolve<RepairLegacy> {
    constructor(private customerService: CustomerService, private repairService: RepairService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<RepairLegacy> {
        const idAsString = route.paramMap.get('id');
        const id = idAsString ? parseInt(idAsString, 10) : 0;

        const legacyRepairO = this.repairService.getByIdLegacy(id);
        const legacyCustomer = this.customerService;

        return this.repairService.getByIdLegacy(id);
    }
}
