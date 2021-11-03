import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RepairsComponent } from './repairs.component';

describe('RepairsComponent', () => {
    let component: RepairsComponent;
    let fixture: ComponentFixture<RepairsComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [RepairsComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(RepairsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
