import { TestBed } from '@angular/core/testing';

import { CoreAppSettings } from './core-app-settings.service';

describe('CoreAppSettingsGuard', () => {
    let guard: CoreAppSettings;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(CoreAppSettings);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
