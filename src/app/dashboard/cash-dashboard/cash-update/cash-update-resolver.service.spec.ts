import { TestBed } from '@angular/core/testing';

import { CashUpdateResolverService } from './cash-update-resolver.service';

describe('CashUpdateResolverService', () => {
    let service: CashUpdateResolverService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CashUpdateResolverService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
