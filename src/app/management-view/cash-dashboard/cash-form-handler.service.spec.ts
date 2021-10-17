import { TestBed } from '@angular/core/testing';

import { CashFormHandlerService } from './cash-form-handler.service';

describe('CashFormHandlerService', () => {
    let service: CashFormHandlerService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CashFormHandlerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
