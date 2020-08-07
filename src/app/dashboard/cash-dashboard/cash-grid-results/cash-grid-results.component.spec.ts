import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashGridResultsComponent } from './cash-grid-results.component';

describe('CashGridResultsComponent', () => {
  let component: CashGridResultsComponent;
  let fixture: ComponentFixture<CashGridResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashGridResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashGridResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
