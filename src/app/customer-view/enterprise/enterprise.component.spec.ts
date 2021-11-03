import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EnterpriseComponent } from './enterprise.component';

describe('EnterpriseComponent', () => {
    let component: EnterpriseComponent;
    let fixture: ComponentFixture<EnterpriseComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [EnterpriseComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(EnterpriseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
