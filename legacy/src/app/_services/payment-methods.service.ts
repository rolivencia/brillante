import { Injectable } from '@angular/core';
import { Installment, PaymentMethod } from '@models/cash-transaction';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { decimalsSeparator, replaceDotWithComma } from '@functions/numeric-utils';

@Injectable({
    providedIn: 'root',
})
export class PaymentMethodsService {
    get referenceInterestRates(): Installment[] {
        return this._referenceInterestRates;
    }
    get paymentMethods(): PaymentMethod[] {
        return this._paymentMethods;
    }

    set paymentMethods(value: PaymentMethod[]) {
        this._paymentMethods = value;
    }

    private _paymentMethods: PaymentMethod[] = [];
    private _referenceInterestRates: Installment[] = [];

    constructor(private http: HttpClient) {}

    public async load() {
        this._paymentMethods = await this.getPaymentMethods().toPromise();
    }

    public loadReferenceInterestRates(): Observable<PaymentMethod> {
        return this.getPaymentMethods().pipe(
            map((paymentMethods: PaymentMethod[]) =>
                paymentMethods.filter((paymentMethod) => paymentMethod.description === 'LaPos Crédito').pop()
            )
        );
    }

    public getPaymentMethods(): Observable<PaymentMethod[]> {
        return this.http.get<PaymentMethodDTO[]>(`${environment.apiUrl}/cash/getPaymentMethods`).pipe(
            map((paymentMethods) =>
                paymentMethods.map((paymentMethod) => ({
                    ...paymentMethod,
                    installments: installmentsMapper(paymentMethod.installments),
                }))
            )
        );
    }

    public getPriceWithAppliedFee(price: number, installments: number = 1): Observable<string> {
        return of(this.paymentMethods).pipe(
            map((paymentMethods: PaymentMethod[]) =>
                paymentMethods.filter((paymentMethod) => paymentMethod.description === 'LaPos Crédito').pop()
            ),
            map(
                (creditReference: PaymentMethod) =>
                    creditReference.installments.filter((x) => x.installments === installments).pop().interestRate
            ),
            map((interestRate) => ((price / installments) * (1 + interestRate)).toFixed(2)),
            map((installmentPrice) => decimalsSeparator(replaceDotWithComma(installmentPrice)))
        );
    }
}

function installmentsMapper(installments: InstallmentDTO[]): Installment[] {
    if (installments.length <= 1) {
        return [];
    }
    return installments.map((installment) => ({
        ...installment,
        interestRate: parseFloat(installment.interestRate),
    }));
}

//TODO: Move to their own file
interface PaymentMethodDTO {
    id: number;
    description: string;
    allowsInstallments: boolean;
    installments: InstallmentDTO[];
}

interface InstallmentDTO {
    installments: number;
    interestRate: string;
}
