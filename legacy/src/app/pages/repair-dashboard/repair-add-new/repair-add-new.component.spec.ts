import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RepairAddNewComponent } from './repair-add-new.component';

describe('RepairAddNewComponent', () => {
    let component: RepairAddNewComponent;
    let fixture: ComponentFixture<RepairAddNewComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [RepairAddNewComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(RepairAddNewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
