import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaymentMethodSelectorComponent } from './payment-method-selector.component';

describe('PaymentMethodSelectorComponent', () => {
    let component: PaymentMethodSelectorComponent;
    let fixture: ComponentFixture<PaymentMethodSelectorComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [PaymentMethodSelectorComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentMethodSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
