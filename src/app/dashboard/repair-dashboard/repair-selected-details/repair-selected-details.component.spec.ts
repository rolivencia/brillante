import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairSelectedDetailsComponent } from './repair-selected-details.component';

describe('RepairSelectedDetailsComponent', () => {
    let component: RepairSelectedDetailsComponent;
    let fixture: ComponentFixture<RepairSelectedDetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RepairSelectedDetailsComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RepairSelectedDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
