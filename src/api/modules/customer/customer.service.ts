import { CustomerRepository } from './customer.repository';
import { CreateCustomerRequestBody, UpdateCustomerRequestBody, CustomerDTO, GetCustomersRequestQuery } from '@models/customer.model';

export class CustomerService {
    private customerRepository: CustomerRepository;

    constructor() {
        this.customerRepository = new CustomerRepository();
    }

    async create(customerData: CreateCustomerRequestBody): Promise<[CustomerDTO, boolean]> {
        const [customer, created] = await this.customerRepository.create(customerData);
        return [this.parseCustomer(customer), created];
    }

    async update(id: number, customerData: UpdateCustomerRequestBody): Promise<CustomerDTO> {
        const customer = await this.customerRepository.update(id, customerData);
        return this.parseCustomer(customer);
    }

    async getAll(params: GetCustomersRequestQuery): Promise<{ rows: CustomerDTO[]; count: number }> {
        const { rows, count } = await this.customerRepository.findAll(params);
        return {
            rows: rows.map(customer => this.parseCustomer(customer)),
            count
        };
    }

    async getByDni(dni: number): Promise<CustomerDTO> {
        const customer = await this.customerRepository.findByDni(dni);
        if (!customer) {
            throw new Error('Customer not found');
        }
        return this.parseCustomer(customer);
    }

    async getByEmail(email: string): Promise<CustomerDTO> {
        const customer = await this.customerRepository.findByEmail(email);
        if (!customer) {
            throw new Error('Customer not found');
        }
        return this.parseCustomer(customer);
    }

    async getById(id: number): Promise<CustomerDTO> {
        const customer = await this.customerRepository.findById(id);
        if (!customer) {
            throw new Error('Customer not found');
        }
        return this.parseCustomer(customer);
    }

    async countAll(): Promise<number> {
        return this.customerRepository.countAll();
    }

    async delete(id: number): Promise<boolean> {
        return this.customerRepository.delete(id);
    }

    private parseCustomer(customer: any): CustomerDTO {
        return {
            id: customer.id,
            firstName: customer.firstName,
            lastName: customer.lastName,
            dni: customer.dni,
            telephone: customer.telephone,
            address: customer.address,
            email: customer.email,
            birthDate: customer.birthDate,
            audit: {
                createdAt: customer.createdAt,
                updatedAt: customer.updatedAt,
                enabled: customer.enabled,
                deleted: customer.deleted,
            },
        };
    }
}
