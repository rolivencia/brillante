import { Moment } from 'moment';
import { User } from '@app/_models/user';

export class Audit {
    public deleted: boolean;
    public enabled: boolean;
    public createdAt: Moment;
    public updatedAt: Moment;
    public createdBy: User;
}
