export class DateObject {
    year: number;
    month: number;
    day: number;
}

export const toDate = (date: DateObject): Date => new Date(date.year, date.month - 1, date.day);
