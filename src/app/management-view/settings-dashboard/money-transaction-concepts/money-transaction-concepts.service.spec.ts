import { TestBed } from '@angular/core/testing';

import { MoneyTransactionConceptsService } from './money-transaction-concepts.service';

describe('CashCategoriesService', () => {
    let service: MoneyTransactionConceptsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MoneyTransactionConceptsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
