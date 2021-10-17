import { Injectable } from '@angular/core';
import { DateObject } from '@models/date-object';
import { Moment } from 'moment';

@Injectable({
    providedIn: 'root',
})
export class DateHandlerService {
    constructor() {}

    public formatMomentToObject(momentDate: Moment): DateObject {
        return {
            year: momentDate.get('year'),
            month: momentDate.get('month') + 1,
            day: momentDate.get('date'),
        };
    }
}
