import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Customer } from '@models/customer';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class CustomerService {
    constructor(private http: HttpClient) {}

    public getAll(offset?: number, limit?: number): Observable<Customer[]> {
        return this.http
            .get<{ count: number; rows: Customer[] }>(`${environment.apiUrl}/client/getAll/${offset}/${limit}`)
            .pipe(map((data) => data.rows as Customer[]));
    }

    public getById(id: number | string): Observable<Customer> {
        return this.http.get<Customer>(`${environment.apiUrl}/client/getById/${id}`);
    }

    public getByDni(dni: number | string): Observable<Customer> {
        return this.http.get<Customer>(`${environment.apiUrl}/client/getByDni/${dni}`);
    }

    public create(customer): Observable<[Customer, boolean]> {
        return this.http.post<[Customer, boolean]>(`${environment.apiUrl}/client/create`, {
            birthDate: customer.birthDate.toISOString(),
            ...customer,
        });
    }
}
