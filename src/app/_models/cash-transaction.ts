import * as moment from 'moment';
import { Moment } from 'moment';
import { Audit } from '@app/_models/audit';

export class CashTransaction {
    public id: number;
    public concept: TransactionConcept;
    public amount: number;
    public type: TransactionType;
    public date: Moment;
    public note: string;
    public audit: Audit;
    public operation: Operation;

    constructor() {
        this.concept = new TransactionConcept();
        this.date = moment();
        this.audit = new Audit();
    }
}

export class TransactionType {
    public id: number;
    public description: string;

    constructor(id, description) {
        this.id = id;
        this.description = description;
    }
}

export class Operation {
    id: number;
    type: 'Sale' | 'Repair' | 'Purchase';

    constructor(id?, type?) {
        this.id = id;
        this.type = type;
    }
}

export class TransactionConcept {
    public id: number;
    public description: string;
    public parent: null | TransactionConcept;

    constructor(id?: number, description?: string, parent?: TransactionConcept) {
        this.id = id;
        this.description = description;
        this.parent = parent;
    }
}
