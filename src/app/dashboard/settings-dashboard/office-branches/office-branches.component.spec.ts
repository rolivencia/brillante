import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeBranchesComponent } from './office-branches.component';

describe('OfficeBranchesComponent', () => {
    let component: OfficeBranchesComponent;
    let fixture: ComponentFixture<OfficeBranchesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OfficeBranchesComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OfficeBranchesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
