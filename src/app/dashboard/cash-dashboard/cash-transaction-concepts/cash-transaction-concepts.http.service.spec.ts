import { TestBed } from '@angular/core/testing';
import { CashTransactionConceptsHttpService } from '@app/dashboard/cash-dashboard/cash-transaction-concepts/cash-transaction-concepts.http.service';

describe('CashConcepts.HttpService', () => {
    let service: CashTransactionConceptsHttpService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CashTransactionConceptsHttpService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});