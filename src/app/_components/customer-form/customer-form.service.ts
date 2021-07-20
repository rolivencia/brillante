import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { DateObject } from '@app/_models/date-object';

@Injectable({
    providedIn: 'root',
})
export class CustomerFormService {
    // TODO: Issue #98 - Limit how many days can an employee with access to the cash register can see in the past. Make it configurable.
    public date: Moment = moment();

    public ngbDateFrom: DateObject;
    public ngbDateTo: DateObject;

    public ngbMinDate: DateObject = {
        year: 1900,
        month: 1,
        day: 1,
    };

    public ngbMaxDate: DateObject = {
        year: this.date.year(),
        month: (this.date.month() + 1) % 13,
        day: this.date.date(),
    };

    constructor() {}
}
