import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOfficeBranchComponent } from './add-office-branch.component';

describe('AddOfficeBranchComponent', () => {
    let component: AddOfficeBranchComponent;
    let fixture: ComponentFixture<AddOfficeBranchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddOfficeBranchComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddOfficeBranchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
