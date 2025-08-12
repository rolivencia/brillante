import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CashService } from '@services/cash.service';

@Injectable({
    providedIn: 'root',
})
export class CashUpdateResolverService {
    constructor(public cashService: CashService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const idAsString = route.paramMap.get('id');
        const id = idAsString ? parseInt(idAsString, 10) : 0;

        return this.cashService.getById(id);
    }
}
