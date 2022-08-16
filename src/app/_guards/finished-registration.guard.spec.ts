import { TestBed } from '@angular/core/testing';

import { FinishedRegistrationGuard } from './finished-registration.guard';

describe('FinishedRegistrationGuard', () => {
    let guard: FinishedRegistrationGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(FinishedRegistrationGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
