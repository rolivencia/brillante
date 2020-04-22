import { TestBed } from '@angular/core/testing';

import { LegacyMapperService } from './legacy-mapper.service';

describe('LegacyMapperService', () => {
    let service: LegacyMapperService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LegacyMapperService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
