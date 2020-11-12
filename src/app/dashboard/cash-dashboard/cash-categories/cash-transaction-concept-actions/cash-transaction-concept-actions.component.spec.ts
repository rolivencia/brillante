import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashTransactionConceptActionsComponent } from './cash-transaction-concept-actions.component';

describe('CashTransactionConceptActionsComponent', () => {
  let component: CashTransactionConceptActionsComponent;
  let fixture: ComponentFixture<CashTransactionConceptActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashTransactionConceptActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashTransactionConceptActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
