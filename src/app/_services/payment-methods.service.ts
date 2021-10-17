import { Injectable } from '@angular/core';
import { PaymentMethod } from '@models/cash-transaction';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PaymentMethodsService {
    get paymentMethods(): PaymentMethod[] {
        return this._paymentMethods;
    }

    set paymentMethods(value: PaymentMethod[]) {
        this._paymentMethods = value;
    }

    private _paymentMethods: PaymentMethod[] = [];

    constructor(private http: HttpClient) {}

    public getPaymentMethods(): Observable<PaymentMethod[]> {
        return this.http.get<PaymentMethod[]>(`${environment.apiUrl}/cash/getPaymentMethods`);
    }
}
