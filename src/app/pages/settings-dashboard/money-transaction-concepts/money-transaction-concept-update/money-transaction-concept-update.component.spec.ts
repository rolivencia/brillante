import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MoneyTransactionConceptUpdateComponent } from './money-transaction-concept-update.component';

describe('CashTransactionConceptUpdateComponent', () => {
    let component: MoneyTransactionConceptUpdateComponent;
    let fixture: ComponentFixture<MoneyTransactionConceptUpdateComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [MoneyTransactionConceptUpdateComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(MoneyTransactionConceptUpdateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
