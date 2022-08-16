import { User } from '@models/user';
import { Moment } from 'moment';

export class Customer {
    public id?: number;
    public dni: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public birthDate: Moment | string | Date;
    public address: string;
    public telephone: string;
    public user: User;

    constructor() {
        this.user = new User();
    }
}
