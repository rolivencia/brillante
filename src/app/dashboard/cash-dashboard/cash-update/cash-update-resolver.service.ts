import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { CashService } from '@app/_services/cash.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CashUpdateResolverService implements Resolve<any> {
    constructor(public cashService: CashService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const idAsString = route.paramMap.get('id');
        const id = idAsString ? parseInt(idAsString, 10) : 0;

        return this.cashService.getById(id);
    }
}
