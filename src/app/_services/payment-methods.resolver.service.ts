import { Injectable } from '@angular/core';
import { PaymentMethod } from '@models/cash-transaction';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { PaymentMethodsService } from '@services/payment-methods.service';

@Injectable({
    providedIn: 'root',
})
export class PaymentMethodsResolverService implements Resolve<PaymentMethod[]> {
    constructor(private paymentMethodsService: PaymentMethodsService) {}

    resolve(): Observable<PaymentMethod[]> {
        return this.paymentMethodsService.getPaymentMethods();
    }
}
