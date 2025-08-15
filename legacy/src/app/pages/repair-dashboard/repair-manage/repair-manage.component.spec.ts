import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairManageComponent } from './repair-manage.component';

describe('RepairManageComponent', () => {
    let component: RepairManageComponent;
    let fixture: ComponentFixture<RepairManageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RepairManageComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RepairManageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
