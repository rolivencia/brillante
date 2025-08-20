import { OfficeBranch, OfficeBranchCreationAttributes, CreateOfficeBranchRequestBody } from '@models/office-branch.model';
import { OfficeBranchRepository } from './office-branch.repository';

export class OfficeBranchService {
    private repository: OfficeBranchRepository;

    constructor() {
      this.repository = new OfficeBranchRepository();
    }

    async get(): Promise<OfficeBranch[]> {
        return this.repository.findAll();
    }

    async create(branch: CreateOfficeBranchRequestBody): Promise<OfficeBranch> {
        const branchData: OfficeBranchCreationAttributes = {
            name: branch.name,
            codeName: branch.name.toLowerCase().split(' ').join('_'),
            address: branch.address,
        };

        return this.repository.create(branchData);
    }
}
