import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashTransactionConceptsComponent } from './cash-transaction-concepts.component';

describe('CashCategoriesComponent', () => {
    let component: CashTransactionConceptsComponent;
    let fixture: ComponentFixture<CashTransactionConceptsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CashTransactionConceptsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CashTransactionConceptsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
