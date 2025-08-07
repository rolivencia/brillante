import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CashReportComponent } from './cash-report.component';

describe('CashReportComponent', () => {
    let component: CashReportComponent;
    let fixture: ComponentFixture<CashReportComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [CashReportComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(CashReportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
