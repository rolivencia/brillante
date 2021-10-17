import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairGridResultsComponent } from './repair-grid-results.component';

describe('RepairGridResultsComponent', () => {
    let component: RepairGridResultsComponent;
    let fixture: ComponentFixture<RepairGridResultsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RepairGridResultsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RepairGridResultsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
