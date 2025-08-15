import { User } from './user';

export class Audit {
    public deleted: boolean;
    public enabled: boolean;
    public createdAt: Date;
    public updatedAt: Date;
    public createdBy: User;

    constructor(createdBy?: User, deleted?: boolean, enabled?: boolean, createdAt?: Date, updatedAt?: Date) {
        this.createdBy = createdBy;
        this.deleted = false;
        this.enabled = true;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
