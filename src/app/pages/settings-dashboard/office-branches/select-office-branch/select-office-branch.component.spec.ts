import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOfficeBranchComponent } from './select-office-branch.component';

describe('SelectOfficeBranchComponent', () => {
    let component: SelectOfficeBranchComponent;
    let fixture: ComponentFixture<SelectOfficeBranchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SelectOfficeBranchComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectOfficeBranchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
