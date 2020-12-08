import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashTransactionConceptInfoComponent } from './cash-transaction-concept-info.component';

describe('CashTransactionConceptInfoComponent', () => {
    let component: CashTransactionConceptInfoComponent;
    let fixture: ComponentFixture<CashTransactionConceptInfoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CashTransactionConceptInfoComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CashTransactionConceptInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
