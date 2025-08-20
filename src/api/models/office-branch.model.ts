export type { OfficeBranch, NewOfficeBranch as OfficeBranchCreationAttributes } from '../db/schema/office-branch.schema';

export interface CreateOfficeBranchRequestBody {
    name: string;
    address: string;
}
