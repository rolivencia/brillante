import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MoneyTransactionConceptAddComponent } from './money-transaction-concept-add.component';

describe('CashTransactionConceptAddComponent', () => {
    let component: MoneyTransactionConceptAddComponent;
    let fixture: ComponentFixture<MoneyTransactionConceptAddComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [MoneyTransactionConceptAddComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(MoneyTransactionConceptAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
