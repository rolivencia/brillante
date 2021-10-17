import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { CashTransactionConceptsService } from './cash-transaction-concepts/cash-transaction-concepts.service';
import { PaymentMethod, TransactionConcept } from '../../_models/cash-transaction';
import { PaymentMethodsService } from '../../_services/payment-methods.service';

@Injectable({
    providedIn: 'root',
})
export class CashDashboardResolverService implements Resolve<CashDashboardAssets> {
    constructor(
        public cashCategoriesService: CashTransactionConceptsService,
        public paymentMethodsService: PaymentMethodsService
    ) {}

    async resolve(route: ActivatedRouteSnapshot): Promise<CashDashboardAssets> {
        const concepts: TransactionConcept[] = await this.cashCategoriesService.getConcepts().toPromise();
        const paymentMethods: PaymentMethod[] = await this.paymentMethodsService.getPaymentMethods().toPromise();

        this.cashCategoriesService.assign(concepts);
        this.paymentMethodsService.paymentMethods = paymentMethods;

        return new Promise((resolve, reject) => {
            if (concepts && concepts.length && paymentMethods && paymentMethods.length) {
                resolve({ concepts: concepts, paymentMethods: paymentMethods });
            } else {
                console.error(Error);
                reject(Error);
            }
        });
    }
}

export interface CashDashboardAssets {
    concepts: TransactionConcept[];
    paymentMethods: PaymentMethod[];
}
