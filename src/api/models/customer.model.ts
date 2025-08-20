export type { Customer, NewCustomer as CustomerCreationAttributes } from '../db/schema/customer.schema';

export interface GetCustomersRequestQuery {
    offset?: number;
    limit?: number;
}

export interface CreateCustomerRequestBody {
    firstName: string;
    lastName: string;
    dni: number;
    telephone: number;
    address: string;
    email: string;
    birthDate?: Date;
}

export interface UpdateCustomerRequestBody {
    firstName?: string;
    lastName?: string;
    dni?: number;
    telephone?: number;
    address?: string;
    email?: string;
    birthDate?: Date;
}

export interface CustomerDTO {
    id: number;
    firstName: string;
    lastName: string;
    dni: number;
    telephone: number;
    address: string;
    email: string;
    birthDate?: Date;
    audit: {
        createdAt: Date;
        updatedAt: Date;
        enabled: boolean;
        deleted: boolean;
    };
}
