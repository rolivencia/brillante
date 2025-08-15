import { User } from '@models/user';

export class Customer {
    public id?: number;
    public dni: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public birthDate: Date | string;
    public address: string;
    public telephone: string;
    public user: User;

    constructor() {
        this.user = new User();
    }
}
