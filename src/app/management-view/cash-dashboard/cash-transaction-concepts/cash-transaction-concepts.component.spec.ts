import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CashTransactionConceptsComponent } from './cash-transaction-concepts.component';

describe('CashCategoriesComponent', () => {
    let component: CashTransactionConceptsComponent;
    let fixture: ComponentFixture<CashTransactionConceptsComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [CashTransactionConceptsComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(CashTransactionConceptsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
