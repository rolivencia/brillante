import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashTransactionConceptUpdateComponent } from './cash-transaction-concept-update.component';

describe('CashTransactionConceptUpdateComponent', () => {
    let component: CashTransactionConceptUpdateComponent;
    let fixture: ComponentFixture<CashTransactionConceptUpdateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CashTransactionConceptUpdateComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CashTransactionConceptUpdateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
