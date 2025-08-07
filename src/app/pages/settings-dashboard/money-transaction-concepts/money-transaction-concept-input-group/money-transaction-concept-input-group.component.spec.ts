import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MoneyTransactionConceptInputGroupComponent } from './money-transaction-concept-input-group.component';

describe('CashTransactionConceptInputGroupComponent', () => {
    let component: MoneyTransactionConceptInputGroupComponent;
    let fixture: ComponentFixture<MoneyTransactionConceptInputGroupComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [MoneyTransactionConceptInputGroupComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(MoneyTransactionConceptInputGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
