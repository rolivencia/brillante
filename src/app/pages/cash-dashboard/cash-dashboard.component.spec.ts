import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CashDashboardComponent } from './cash-dashboard.component';

describe('CashDashboardComponent', () => {
    let component: CashDashboardComponent;
    let fixture: ComponentFixture<CashDashboardComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [CashDashboardComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(CashDashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
