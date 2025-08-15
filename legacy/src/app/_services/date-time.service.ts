import { Injectable } from '@angular/core';
import { parseISO } from 'date-fns';
import { DateObject } from '@models/date-object';

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
        return parseISO(dateIsoString);
    }

    public formatDateToObject(date: Date): DateObject {
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
        };
    }
}
