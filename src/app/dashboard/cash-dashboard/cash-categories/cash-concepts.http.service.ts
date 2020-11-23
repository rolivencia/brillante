import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransactionConcept } from '@app/_models/cash-transaction';
import { environment } from '@environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CashConceptsHttpService {
    constructor(private http: HttpClient) {}

    public create(concept: TransactionConcept): Observable<TransactionConcept[]> {
        return this.http.post<TransactionConcept[]>(
            `${environment.apiUrl}/cash/transaction/create`,
            { concept: concept }
        );
    }

    public update(
        concept: TransactionConcept
    ): Observable<TransactionConcept[]> {
        return this.http.put<TransactionConcept[]>(
            `${environment.apiUrl}/cash/transaction/update`,
            { concept: concept }
        );
    }
}