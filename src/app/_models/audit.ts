import { Moment } from 'moment';
import { User } from '@models/user';

export class Audit {
    public deleted: boolean;
    public enabled: boolean;
    public createdAt: Moment;
    public updatedAt: Moment;
    public createdBy: User;

    constructor(createdBy?: User, deleted?: boolean, enabled?: boolean, createdAt?: Moment, updatedAt?: Moment) {
        this.createdBy = createdBy;
        this.deleted = false;
        this.enabled = true;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
