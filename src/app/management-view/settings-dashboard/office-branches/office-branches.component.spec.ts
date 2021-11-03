import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OfficeBranchesComponent } from './office-branches.component';

describe('OfficeBranchesComponent', () => {
    let component: OfficeBranchesComponent;
    let fixture: ComponentFixture<OfficeBranchesComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OfficeBranchesComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OfficeBranchesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
