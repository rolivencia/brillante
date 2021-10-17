import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { RepairStatus } from '../../_models';
import { RepairService } from '../../_services/repair.service';
import { PaymentMethodsService } from '../../_services/payment-methods.service';
import { PaymentMethod, TransactionConcept } from '../../_models/cash-transaction';

@Injectable({
    providedIn: 'root',
})
export class RepairDashboardResolverService implements Resolve<RepairDashboardAssets> {
    constructor(public repairService: RepairService, public paymentMethodsService: PaymentMethodsService) {}

    async resolve(route: ActivatedRouteSnapshot): Promise<RepairDashboardAssets> {
        const repairStatuses: RepairStatus[] = await this.repairService.getStatusData().toPromise();
        const paymentMethods: PaymentMethod[] = await this.paymentMethodsService.getPaymentMethods().toPromise();

        this.repairService.repairStatuses = [].concat(repairStatuses);
        this.paymentMethodsService.paymentMethods = paymentMethods;

        return new Promise((resolve, reject) => {
            if (repairStatuses && repairStatuses.length) {
                resolve({ repairStatuses: repairStatuses, paymentMethods: paymentMethods });
            } else {
                console.error(Error);
                reject(Error);
            }
        });
    }
}

export interface RepairDashboardAssets {
    repairStatuses: RepairStatus[];
    paymentMethods: PaymentMethod[];
}
