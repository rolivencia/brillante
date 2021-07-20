import { User } from '@app/_models/user';
import { Moment } from 'moment';
import { DateObject } from '@app/_models/date-object';

export class Customer {
    public id?: number;
    public dni: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public birthDate: Moment | string | DateObject;
    public address: string;
    public telephone: string;
    public secondaryTelephone: string;
    public user: User;

    constructor() {
        this.user = new User();
    }
}
