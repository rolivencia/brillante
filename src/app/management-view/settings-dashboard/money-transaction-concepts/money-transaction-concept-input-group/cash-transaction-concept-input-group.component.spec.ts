import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CashTransactionConceptInputGroupComponent } from './cash-transaction-concept-input-group.component';

describe('CashTransactionConceptInputGroupComponent', () => {
    let component: CashTransactionConceptInputGroupComponent;
    let fixture: ComponentFixture<CashTransactionConceptInputGroupComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [CashTransactionConceptInputGroupComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(CashTransactionConceptInputGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
