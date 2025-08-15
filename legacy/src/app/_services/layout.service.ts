import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LayoutService {
    public useContainer: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    constructor() {}
}
