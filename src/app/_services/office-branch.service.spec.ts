import { TestBed } from '@angular/core/testing';

import { OfficeBranchService } from './office-branch.service';

describe('OfficeBranchService', () => {
    let service: OfficeBranchService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(OfficeBranchService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
