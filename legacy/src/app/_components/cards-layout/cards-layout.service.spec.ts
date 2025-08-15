import { TestBed } from '@angular/core/testing';

import { CardsLayoutService } from './cards-layout.service';

describe('CardsLayoutService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: CardsLayoutService = TestBed.inject(CardsLayoutService);
        expect(service).toBeTruthy();
    });
});
