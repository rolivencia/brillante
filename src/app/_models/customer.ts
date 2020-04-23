import { User } from '@app/_models/user';

export class Customer {
    public id?: number;
    public dni: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public address: string;
    public telephone: number;
    public secondaryTelephone: number;
    public user: User;

    constructor() {
        this.user = new User();
    }
}