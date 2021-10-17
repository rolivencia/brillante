import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashUpdateComponent } from './cash-update.component';

describe('CashUpdateComponent', () => {
    let component: CashUpdateComponent;
    let fixture: ComponentFixture<CashUpdateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CashUpdateComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CashUpdateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
