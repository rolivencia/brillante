import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { CashCategoriesService } from './cash-categories/cash-categories.service';
import { CashService } from '../../_services/cash.service';
import { TransactionConcept } from '../../_models/cash-transaction';

@Injectable({
    providedIn: 'root',
})
export class CashDashboardResolverService implements Resolve<any> {
    constructor(public cashCategoriesService: CashCategoriesService, private cashService: CashService) {}

    async resolve(route: ActivatedRouteSnapshot): Promise<any> {
        const concepts: TransactionConcept[] = await this.cashService.getConcepts().toPromise();
        this.cashCategoriesService.initialize(concepts);

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
