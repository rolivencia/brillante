import { TestBed } from '@angular/core/testing';

import { RepairUpdateResolverService } from './repair-update-resolver.service';

describe('RepairUpdateResolverService', () => {
    let service: RepairUpdateResolverService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(RepairUpdateResolverService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
