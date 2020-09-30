import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Customer } from '@app/_models/customer';

@Injectable({
    providedIn: 'root',
})
export class CustomerService {
    constructor(private http: HttpClient) {}

    public getAll(offset?: number, limit?: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/client/getAll/${offset}/${limit}`);
    }

    public getById(id: number | string): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/client/getById/${id}`);
    }

    public getByDni(dni: number | string): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/client/getByDni/${dni}`);
    }

    public create(customer): Observable<[Customer, boolean]> {
        return this.http.post<[Customer, boolean]>(`${environment.apiUrl}/client/create`, { ...customer });
    }
}
