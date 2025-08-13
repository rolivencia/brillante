import { Audit } from '@models/audit';
import { OfficeBranch } from '@models/office-branch';

export class CashTransaction {
    public id: number;
    public concept: TransactionConcept;
    public amount: number;
    public date: Date;
    public note: string;
    public audit: Audit;
    public operation?: Operation;
    public paymentMethod: PaymentMethod;
    public payments?: Payment[];
    public officeBranch?: OfficeBranch;

    constructor(
        id?: number,
        concept?: TransactionConcept,
        amount?: number,
        date?: Date,
        note?: string,
        audit?: Audit,
        operation?: Operation,
        paymentMethod?: PaymentMethod,
        payments?: Payment[],
        officeBranch?: OfficeBranch
    ) {
        this.id = id;
        this.concept = concept ? concept : new TransactionConcept();
        this.amount = amount ? amount : 0;
        this.date = date ? date : new Date();
        this.audit = audit ? audit : new Audit();
        this.operation = operation ? operation : new Operation();
        this.paymentMethod = paymentMethod ? paymentMethod : new PaymentMethod();
        this.payments = payments ? payments : [];
        this.officeBranch = officeBranch ? officeBranch : new OfficeBranch();
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

export class Payment {
    amount: number;
    paymentMethod: PaymentMethod;

    constructor(amount?: number, paymentMethod?: PaymentMethod) {
        this.amount = amount;
        this.paymentMethod = paymentMethod;
    }
}

export class PaymentMethod {
    public id: number;
    public description: string;
    public allowsInstallments: boolean;
    public installments: Installment[];

    constructor(id?: number, description?: string, allowsInstallments?: boolean, installments?: Installment[]) {
        this.id = id;
        this.description = description;
        this.allowsInstallments = allowsInstallments ?? false;
        this.installments = installments ?? [];
    }
}

export class Installment {
    installments: number;
    interestRate: number;
}
