import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashTransactionConceptInputGroupComponent } from './cash-transaction-concept-input-group.component';

describe('CashTransactionConceptInputGroupComponent', () => {
  let component: CashTransactionConceptInputGroupComponent;
  let fixture: ComponentFixture<CashTransactionConceptInputGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashTransactionConceptInputGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashTransactionConceptInputGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
