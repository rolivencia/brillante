import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CardsLayoutService {
    topCardTitle: string = '';
    leftCardTitle: string = '';
    rightCardTitle: string = '';

    constructor() {}
}
