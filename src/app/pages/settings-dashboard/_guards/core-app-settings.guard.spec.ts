import { TestBed } from '@angular/core/testing';

import { CoreAppSettingsGuard } from './core-app-settings.guard';

describe('CoreAppSettingsGuard', () => {
    let guard: CoreAppSettingsGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(CoreAppSettingsGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
