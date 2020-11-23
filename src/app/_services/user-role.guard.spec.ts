import { TestBed } from '@angular/core/testing';

import { CashRolesGuard } from './cash-roles-guard.service';

describe('UserRoleGuard', () => {
    let guard: CashRolesGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(CashRolesGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
