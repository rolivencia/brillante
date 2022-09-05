import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@models/user';
import { Observable } from 'rxjs';
import { Customer } from '@models/customer';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) {}

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/users/${id}`);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${environment.apiUrl}/users/${user.id}`, user);
    }

    public updateCustomerUser(user: Partial<User>, customer: Partial<Customer>): Observable<[User, Customer]> {
        return this.http.put<[User, Customer]>(`${environment.apiUrl}/users/updateCustomerUser`, { user, customer });
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }
}
