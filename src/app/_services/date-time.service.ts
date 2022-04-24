import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root',
})
export class DateTimeService {
    constructor() {}

    /**
     * Transforms a date in ISO string format to Date type, without time
     * @param dateIsoString - Date in ISO string format
     */
    public toDate(dateIsoString: string): Date {
        return moment(dateIsoString).toDate();
    }
}
