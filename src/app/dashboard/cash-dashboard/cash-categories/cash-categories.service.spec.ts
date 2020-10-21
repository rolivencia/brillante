import { TestBed } from '@angular/core/testing';

import { CashCategoriesService } from './cash-categories.service';

describe('CashCategoriesService', () => {
    let service: CashCategoriesService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CashCategoriesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
