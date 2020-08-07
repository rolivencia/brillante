import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashAddNewComponent } from './cash-add-new.component';

describe('CashAddNewComponent', () => {
  let component: CashAddNewComponent;
  let fixture: ComponentFixture<CashAddNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashAddNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashAddNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
