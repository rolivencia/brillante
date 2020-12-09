import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashTransactionConceptSelectedDetailsComponent } from './cash-transaction-concept-selected-details.component';

describe('CashTransactionConceptInfoComponent', () => {
    let component: CashTransactionConceptSelectedDetailsComponent;
    let fixture: ComponentFixture<CashTransactionConceptSelectedDetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CashTransactionConceptSelectedDetailsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CashTransactionConceptSelectedDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
