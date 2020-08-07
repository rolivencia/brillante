import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashSelectedDetailsComponent } from './cash-selected-details.component';

describe('CashSelectedDetailsComponent', () => {
  let component: CashSelectedDetailsComponent;
  let fixture: ComponentFixture<CashSelectedDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashSelectedDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashSelectedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
