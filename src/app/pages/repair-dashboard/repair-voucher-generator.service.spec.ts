import { TestBed } from '@angular/core/testing';

import { RepairVoucherGeneratorService } from './repair-voucher-generator.service';

describe('RepairVoucherGeneratorService', () => {
    let service: RepairVoucherGeneratorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(RepairVoucherGeneratorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
