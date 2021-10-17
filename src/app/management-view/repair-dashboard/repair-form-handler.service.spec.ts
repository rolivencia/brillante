import { TestBed } from '@angular/core/testing';

import { RepairFormHandlerService } from './repair-form-handler.service';

describe('RepairFormHandlerService', () => {
    let service: RepairFormHandlerService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(RepairFormHandlerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
