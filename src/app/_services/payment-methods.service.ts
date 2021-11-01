import { Injectable } from '@angular/core';
import { Installment, PaymentMethod } from '@models/cash-transaction';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
        return this.http.get<PaymentMethodDTO[]>(`${environment.apiUrl}/cash/getPaymentMethods`).pipe(
            map((paymentMethods) =>
                paymentMethods.map((paymentMethod) => ({
                    ...paymentMethod,
                    installments: installmentsMapper(paymentMethod.installments),
                }))
            )
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
