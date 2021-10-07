import { TestBed } from '@angular/core/testing';

import { OfficeBranchGuard } from './office-branch.guard';

describe('OfficeBranchGuard', () => {
    let guard: OfficeBranchGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(OfficeBranchGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
