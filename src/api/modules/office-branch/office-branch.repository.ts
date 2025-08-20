import { eq } from 'drizzle-orm';
import { db } from '@helpers/drizzle-connector';
import { officeBranch } from '@schemas/office-branch.schema';
import { OfficeBranch, OfficeBranchCreationAttributes } from '@models/office-branch.model';

export class OfficeBranchRepository {
    async findAll(): Promise<OfficeBranch[]> {
        return db.select().from(officeBranch);
    }

    async create(branchData: OfficeBranchCreationAttributes): Promise<OfficeBranch> {
        return db.transaction(async (tx) => {
            const result = await tx.insert(officeBranch).values(branchData);
            const insertId = result[0].insertId;

            if (!insertId) {
                throw new Error('Failed to create office branch');
            }

            const [newBranch] = await tx.select().from(officeBranch).where(eq(officeBranch.id, insertId));

            if (!newBranch) {
                throw new Error('Failed to retrieve created office branch');
            }

            return newBranch;
        });
    }

    async findById(id: number): Promise<OfficeBranch | null> {
        const [result] = await db.select().from(officeBranch).where(eq(officeBranch.id, id));
        return result || null;
    }

    async update(id: number, branchData: Partial<OfficeBranchCreationAttributes>): Promise<OfficeBranch> {
        return db.transaction(async (tx) => {
            await tx.update(officeBranch).set(branchData).where(eq(officeBranch.id, id));

            const [updatedBranch] = await tx.select().from(officeBranch).where(eq(officeBranch.id, id));

            if (!updatedBranch) {
                throw new Error('Failed to update office branch or branch not found');
            }

            return updatedBranch;
        });
    }

    async delete(id: number): Promise<boolean> {
        return db.transaction(async (tx) => {
            const existingBranch = await tx.select().from(officeBranch).where(eq(officeBranch.id, id));

            if (existingBranch.length === 0) {
                throw new Error(`Failed to delete office branch or branch not found (id: ${id}`);
            }

            await tx.delete(officeBranch).where(eq(officeBranch.id, id));
            return true;
        });
    }
}
