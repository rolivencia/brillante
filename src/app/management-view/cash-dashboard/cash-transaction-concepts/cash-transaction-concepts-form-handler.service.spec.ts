import { TestBed } from '@angular/core/testing';

import { CashTransactionConceptsFormHandlerService } from './cash-transaction-concepts-form-handler.service';

describe('CashTransactionConceptsFormHandlerService', () => {
    let service: CashTransactionConceptsFormHandlerService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CashTransactionConceptsFormHandlerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
