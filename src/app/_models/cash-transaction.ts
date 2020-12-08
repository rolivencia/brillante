import * as moment from 'moment';
import { Audit } from '@app/_models/audit';
import { Moment } from 'moment';

export class CashTransaction {
    public id: number;
    public concept: TransactionConcept;
    public amount: number;
    public date: Moment;
    public note: string;
    public audit: Audit;
    public operation?: Operation;

    constructor() {
        this.concept = new TransactionConcept();
        this.date = moment();
        this.audit = new Audit();
        this.operation = new Operation();
    }
}

export class TransactionType {
    public id: number;
    public description: string;

    constructor(id?, description?) {
        this.id = id;
        this.description = description;
    }
}

export class Operation {
    id: number;
    description: 'Venta' | 'Reparación' | 'Compra';

    constructor(id?, type?) {
        this.id = id;
        this.description = type;
    }
}

export class TransactionConcept {
    public id: number;
    public description: string;
    public transactionType: TransactionType;
    public parent: null | TransactionConcept;
    public children: TransactionConcept[];
    public userAssignable: boolean;
    public audit?: Audit;
    public enabled: boolean;
    public modifiable: boolean;

    constructor(
        id?: number,
        description?: string,
        transactionType?: TransactionType,
        parent: TransactionConcept = null,
        children: [] = [],
        userAssignable: boolean = true,
        enabled: boolean = true,
        modifiable: boolean = true,
        audit: Audit = null
    ) {
        this.id = id;
        this.description = description;
        this.transactionType = transactionType ? transactionType : new TransactionType();
        this.parent = parent;
        this.children = children ? children : [];
        this.userAssignable = userAssignable;
        this.modifiable = modifiable;
        this.enabled = enabled;
        this.audit = audit ? audit : new Audit();
    }
}
