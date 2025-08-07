import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MoneyTransactionConceptsComponent } from './money-transaction-concepts.component';

describe('CashCategoriesComponent', () => {
    let component: MoneyTransactionConceptsComponent;
    let fixture: ComponentFixture<MoneyTransactionConceptsComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [MoneyTransactionConceptsComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(MoneyTransactionConceptsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
