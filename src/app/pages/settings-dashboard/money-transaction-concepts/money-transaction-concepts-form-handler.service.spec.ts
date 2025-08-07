import { TestBed } from '@angular/core/testing';

import { MoneyTransactionConceptsFormHandlerService } from './money-transaction-concepts-form-handler.service';

describe('CashTransactionConceptsFormHandlerService', () => {
    let service: MoneyTransactionConceptsFormHandlerService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MoneyTransactionConceptsFormHandlerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
