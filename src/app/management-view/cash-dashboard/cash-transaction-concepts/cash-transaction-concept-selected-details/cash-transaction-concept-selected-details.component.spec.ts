import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CashTransactionConceptSelectedDetailsComponent } from './cash-transaction-concept-selected-details.component';

describe('CashTransactionConceptInfoComponent', () => {
    let component: CashTransactionConceptSelectedDetailsComponent;
    let fixture: ComponentFixture<CashTransactionConceptSelectedDetailsComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [CashTransactionConceptSelectedDetailsComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(CashTransactionConceptSelectedDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
