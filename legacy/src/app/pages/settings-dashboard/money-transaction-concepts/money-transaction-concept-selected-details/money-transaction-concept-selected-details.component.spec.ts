import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MoneyTransactionConceptSelectedDetailsComponent } from './money-transaction-concept-selected-details.component';

describe('CashTransactionConceptInfoComponent', () => {
    let component: MoneyTransactionConceptSelectedDetailsComponent;
    let fixture: ComponentFixture<MoneyTransactionConceptSelectedDetailsComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [MoneyTransactionConceptSelectedDetailsComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(MoneyTransactionConceptSelectedDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
