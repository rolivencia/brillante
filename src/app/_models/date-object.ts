import * as moment from 'moment';
import { Moment } from 'moment';

export class DateObject {
    year: number;
    month: number;
    day: number;
}

export const toMoment = (date: DateObject): Moment => moment(`${date.year}-${date.month}-${date.day}`);
