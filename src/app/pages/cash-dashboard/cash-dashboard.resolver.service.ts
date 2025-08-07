import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { MoneyTransactionConceptsService } from '@pages/settings-dashboard/money-transaction-concepts/money-transaction-concepts.service';
import { TransactionConcept } from '@models/cash-transaction';

@Injectable({
    providedIn: 'root',
})
export class CashDashboardResolverService implements Resolve<CashDashboardAssets> {
    constructor(public moneyTransactionConceptsService: MoneyTransactionConceptsService) {}

    async resolve(route: ActivatedRouteSnapshot): Promise<CashDashboardAssets> {
        const concepts: TransactionConcept[] = await this.moneyTransactionConceptsService.getConcepts().toPromise();

        this.moneyTransactionConceptsService.assign(concepts);

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
