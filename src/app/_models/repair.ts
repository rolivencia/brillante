import { Moment } from 'moment';
import { Customer } from '@app/_models/customer';
import { Audit } from '@app/_models/audit';

export class Repair {
    public id: number;
    public customer: Customer;
    public device: Device;
    public note: string;
    public issue: string;
    public status: RepairStatus;
    public audit: Audit;
    public checkInDate: Moment;
    public lastUpdateDate: Moment;
    public checkoutDate: Moment;
    public paymentInAdvance: number;
    public price: number;
    public cost: number;

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
}

export class RepairLegacy {
    public apellidoCliente: string;
    public encendido: number;
    public estado: string;
    public fechaIngreso: string;
    public fechaReparacionTerminada: string;
    public fechaUltimaActualizacion: string;
    public horaUltimaActualizacion: string;
    public problema: string;
    public imei: string;
    public marca: string;
    public message: string;
    public modelo: string;
    public nombreCliente: string;
    public nota: string;
    public precioReparacion: string;
    public repairId: number;
    public seniaReparacion: string;
    public status: string;
    public tipoEquipoId: number;
    public nombreApellidoCliente: string;
    public emailCliente: string;
    public telefonoCliente: string | number;
    public costoReparacion: string;

    constructor() {}
}
