import { TestBed } from '@angular/core/testing';

import { AdministrativeAppSettingsGuard } from './administrative-app-settings.guard';

describe('AdministrativeAppSettingsGuard', () => {
    let guard: AdministrativeAppSettingsGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(AdministrativeAppSettingsGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
