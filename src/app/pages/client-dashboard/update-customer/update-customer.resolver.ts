import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerService } from '@services/customer.service';
import { Customer } from '@models/customer';

@Injectable({
    providedIn: 'root',
})
export class UpdateCustomerResolver implements Resolve<Customer> {
    constructor(private customerService: CustomerService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Customer> {
        const idAsString = route.paramMap.get('id');
        const id = idAsString ? parseInt(idAsString, 10) : 0;
        return this.customerService.getById(id);
    }
}
