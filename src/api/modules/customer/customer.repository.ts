import { eq, and, count } from 'drizzle-orm';
import { db } from '@helpers/drizzle-connector';
import { customer } from '@schemas/customer.schema';
import { Customer, CustomerCreationAttributes, GetCustomersRequestQuery } from '@models/customer.model';

export class CustomerRepository {
    async findAll(params: GetCustomersRequestQuery): Promise<{ rows: Customer[]; count: number }> {
        const { offset = 0, limit = 20 } = params;
        const [rows, countResult] = await Promise.all([
            db.select().from(customer).limit(limit).offset(offset),
            db.select({ count: count() }).from(customer)
        ]);

        return {
            rows,
            count: countResult[0].count
        };
    }

    async create(customerData: CustomerCreationAttributes): Promise<[Customer, boolean]> {
        return db.transaction(async (tx) => {
            const existing = await tx.select().from(customer).where(eq(customer.dni, customerData.dni!));

            if (existing.length > 0) {
                return [existing[0], false];
            }

            const result = await tx.insert(customer).values({
                ...customerData,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            const insertId = result[0].insertId;

            if (!insertId) {
                throw new Error('Failed to create customer');
            }

            const [newCustomer] = await tx.select().from(customer).where(eq(customer.id, insertId));

            if (!newCustomer) {
                throw new Error('Failed to retrieve created customer');
            }

            return [newCustomer, true];
        });
    }

    async findByDni(dni: number): Promise<Customer | null> {
        const [result] = await db.select().from(customer).where(
            and(
                eq(customer.dni, dni),
                eq(customer.deleted, false)
            )
        );
        return result || null;
    }

    async findByEmail(email: string): Promise<Customer | null> {
        const [result] = await db.select().from(customer).where(
            and(
                eq(customer.email, email),
                eq(customer.deleted, false)
            )
        );
        return result || null;
    }

    async findById(id: number): Promise<Customer | null> {
        const [result] = await db.select().from(customer).where(
            and(
                eq(customer.id, id),
                eq(customer.deleted, false)
            )
        );
        return result || null;
    }

    async update(id: number, customerData: Partial<CustomerCreationAttributes>): Promise<Customer> {
        return db.transaction(async (tx) => {
            await tx.update(customer).set({
                ...customerData,
                updatedAt: new Date(),
            }).where(eq(customer.id, id));

            const [updatedCustomer] = await tx.select().from(customer).where(eq(customer.id, id));

            if (!updatedCustomer) {
                throw new Error('Failed to update customer or customer not found');
            }

            return updatedCustomer;
        });
    }

    async countAll(): Promise<number> {
        const [result] = await db.select({ count: count() }).from(customer).where(
            eq(customer.deleted, false)
        );
        return result.count;
    }

    async delete(id: number): Promise<boolean> {
        return db.transaction(async (tx) => {
            const existingCustomer = await tx.select().from(customer).where(eq(customer.id, id));

            if (existingCustomer.length === 0) {
                throw new Error(`Failed to delete customer or customer not found (id: ${id})`);
            }

            await tx.update(customer).set({
                deleted: true,
                updatedAt: new Date(),
            }).where(eq(customer.id, id));

            return true;
        });
    }
}
