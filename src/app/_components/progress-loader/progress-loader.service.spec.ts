import { TestBed } from '@angular/core/testing';

import { ProgressLoaderService } from './progress-loader.service';

describe('SvmProgressLoaderService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ProgressLoaderService = TestBed.inject(ProgressLoaderService);
        expect(service).toBeTruthy();
    });
});
