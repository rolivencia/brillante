import { TestBed } from '@angular/core/testing';

import { CashReportService } from './cash-report.service';

describe('CashReportService', () => {
    let service: CashReportService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CashReportService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
