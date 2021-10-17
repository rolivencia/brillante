import { TestBed } from '@angular/core/testing';

import { CashTransactionConceptsService } from './cash-transaction-concepts.service';

describe('CashCategoriesService', () => {
    let service: CashTransactionConceptsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CashTransactionConceptsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
