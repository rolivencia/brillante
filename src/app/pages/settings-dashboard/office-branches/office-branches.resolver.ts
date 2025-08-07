import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OfficeBranch } from '@models/office-branch';
import { OfficeBranchService } from '@services/office-branch.service';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class OfficeBranchesResolver implements Resolve<OfficeBranch[]> {
    constructor(private officeBranchService: OfficeBranchService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OfficeBranch[]> {
        return this.officeBranchService.fetch().pipe(
            tap((officeBranches) => {
                this.officeBranchService.officeBranches$.next(officeBranches);
            })
        );
    }
}
