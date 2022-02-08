import { Moment } from 'moment';
import { Customer } from '@models/customer';
import { Audit } from '@models/audit';
import { CashTransaction } from '@models/cash-transaction';

export class Repair {
    public id: number;
    public customer: Customer;
    public device: Device;
    public note: string;
    public issue: string;
    public status: RepairStatus;
    public audit: Audit;
    public checkIn: Moment;
    public lastUpdate: Moment;
    public checkOut: Moment;
    public paymentInAdvance: number;
    public price: number;
    public cost: number;
    public warrantyTerm: number;
    public history: RepairStatusHistory[] | any[]; // TODO: Implement RepairStatusHistory class
    public moneyTransactions: CashTransaction[];

    //FIXME: En carga, traer la lista y ahí asignar vía filter.
    constructor() {
        this.customer = new Customer();
        this.audit = new Audit();
        this.device = new Device();
        this.device.type = { id: 0, description: 'Smartphone' };
        this.device.turnedOn = false;
        this.status = { id: 0, description: 'Ingresado' };
        this.paymentInAdvance = 0;
        this.price = 0;
        this.cost = 0;
        this.note = '';
        this.warrantyTerm = 3;

        // Date attributes
        this.checkIn = null;
        this.lastUpdate = null;
        this.checkOut = null;

        // Related money transactions
        this.moneyTransactions = [];
    }
}

export class Device {
    public turnedOn: boolean;
    public manufacturer: string;
    public model: string;
    public deviceId: string; //IMEI, UUID, etc.
    public type: DeviceType; //IMEI, UUID, etc.

    constructor() {
        this.type = new DeviceType();
    }
}

export class DeviceType {
    public id: number;
    public description: string;

    constructor(id?: number, description?: string) {
        this.id = id;
        this.description = description;
    }
}

export class RepairStatus {
    public id: number;
    public description: string;

    constructor(id?: number, description?: string) {
        this.id = id;
        this.description = description;
    }
}

export class RepairStatusHistory {
    //TODO: Implement attributes of this class. Check database.
}
