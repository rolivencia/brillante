import { Injectable } from '@angular/core';
import { OfficeBranch } from '@app/_models/office-branch';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

/**
 * Service in charge of providing the current assigned Office Branch for the running application instance.
 * It provides methods to load the current Branch, assign a new one and fetch the available ones.
 */
@Injectable({
    providedIn: 'root',
})
export class OfficeBranchService {
    get current(): BehaviorSubject<OfficeBranch> {
        return this._current;
    }

    /**
     * Stores the currently assigned Office Branch for the running application instance
     * @private
     */
    private _current: BehaviorSubject<OfficeBranch> = new BehaviorSubject<OfficeBranch>(null);

    constructor(private http: HttpClient) {}

    /**
     * If available, checks for a record in localStorage to load the assigned Office Branch when the application loads
     */
    public load() {
        //Check if loaded from localStorage. Else, return null
        const currentCandidate = JSON.parse(localStorage.getItem('officeBranch.current'));

        if (currentCandidate) {
            this._current.next(currentCandidate);
        }
    }

    /**
     * Assign a given Office Branch as the current for a running application instance and persists it to the localStorage
     * @param officeBranch - The Office Branch that is to be assigned to the application instance
     */
    public assign(officeBranch: OfficeBranch) {
        this._current.next(officeBranch);
        localStorage.setItem('officeBranch.current', JSON.stringify(officeBranch));
    }

    /**
     * Retrieves the collection of assignable Office Branches for a running application instance
     */
    public fetch(): Observable<OfficeBranch[]> {
        return this.http.get<OfficeBranch[]>(`${environment.apiUrl}/office-branch/getAll`);
        // return of([{ id: 1, name: '25 de Mayo', address: '25 de Mayo' }]);
    }
}
