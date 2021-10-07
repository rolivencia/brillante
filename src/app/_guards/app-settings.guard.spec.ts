import { TestBed } from '@angular/core/testing';

import { AppSettingsGuard } from './app-settings.guard';

describe('AppSettingsGuard', () => {
    let guard: AppSettingsGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(AppSettingsGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
