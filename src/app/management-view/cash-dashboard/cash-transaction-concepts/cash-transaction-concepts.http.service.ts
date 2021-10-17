import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransactionConcept } from '@models/cash-transaction';
import { environment } from '@environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CashTransactionConceptsHttpService {
    constructor(private http: HttpClient) {}

    public create(concept: TransactionConcept): Observable<TransactionConcept> {
        return this.http.post<TransactionConcept>(`${environment.apiUrl}/cash/transaction/create`, {
            concept: concept,
        });
    }

    public update(concept: TransactionConcept): Observable<number[]> {
        return this.http.put<number[]>(`${environment.apiUrl}/cash/transaction/update`, {
            concept: concept,
        });
    }

    public enable(concept: TransactionConcept): Observable<number[]> {
        return this.http.put<number[]>(`${environment.apiUrl}/cash/transaction/enable`, {
            concept: concept,
        });
    }

    public disable(concept: TransactionConcept): Observable<number[]> {
        return this.http.put<number[]>(`${environment.apiUrl}/cash/transaction/disable`, {
            concept: concept,
        });
    }
}
