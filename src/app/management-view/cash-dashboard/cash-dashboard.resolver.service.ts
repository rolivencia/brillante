import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { CashTransactionConceptsService } from './cash-transaction-concepts/cash-transaction-concepts.service';
import { TransactionConcept } from '../../_models/cash-transaction';

@Injectable({
    providedIn: 'root',
})
export class CashDashboardResolverService implements Resolve<CashDashboardAssets> {
    constructor(public cashCategoriesService: CashTransactionConceptsService) {}

    async resolve(route: ActivatedRouteSnapshot): Promise<CashDashboardAssets> {
        const concepts: TransactionConcept[] = await this.cashCategoriesService.getConcepts().toPromise();

        this.cashCategoriesService.assign(concepts);

        return new Promise((resolve, reject) => {
            if (concepts && concepts.length) {
                resolve({ concepts: concepts });
            } else {
                console.error(Error);
                reject(Error);
            }
        });
    }
}

export interface CashDashboardAssets {
    concepts: TransactionConcept[];
}
