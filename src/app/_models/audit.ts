import { Moment } from 'moment';

export class Audit {
    public deleted: boolean;
    public enabled: boolean;
    public createdAt: Moment;
    public enabledAt: Moment;
}
