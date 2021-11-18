import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CashTransactionConceptAddComponent } from './cash-transaction-concept-add.component';

describe('CashTransactionConceptAddComponent', () => {
    let component: CashTransactionConceptAddComponent;
    let fixture: ComponentFixture<CashTransactionConceptAddComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [CashTransactionConceptAddComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(CashTransactionConceptAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
