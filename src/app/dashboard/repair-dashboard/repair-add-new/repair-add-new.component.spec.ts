import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairAddNewComponent } from './repair-add-new.component';

describe('RepairAddNewComponent', () => {
    let component: RepairAddNewComponent;
    let fixture: ComponentFixture<RepairAddNewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RepairAddNewComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RepairAddNewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
