import { TestBed } from '@angular/core/testing';

import { OfficeBranchesResolver } from './office-branches.resolver';

describe('OfficeBranchesResolver', () => {
    let resolver: OfficeBranchesResolver;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        resolver = TestBed.inject(OfficeBranchesResolver);
    });

    it('should be created', () => {
        expect(resolver).toBeTruthy();
    });
});
