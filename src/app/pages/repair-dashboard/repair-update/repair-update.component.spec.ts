import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RepairUpdateComponent } from './repair-update.component';

describe('RepairUpdateComponent', () => {
    let component: RepairUpdateComponent;
    let fixture: ComponentFixture<RepairUpdateComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [RepairUpdateComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(RepairUpdateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
