import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairUpdateComponent } from './repair-update.component';

describe('RepairUpdateComponent', () => {
    let component: RepairUpdateComponent;
    let fixture: ComponentFixture<RepairUpdateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RepairUpdateComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RepairUpdateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
