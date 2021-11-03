import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LinearSpinnerComponent } from './linear-spinner.component';

describe('LinearSpinnerComponent', () => {
    let component: LinearSpinnerComponent;
    let fixture: ComponentFixture<LinearSpinnerComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [LinearSpinnerComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(LinearSpinnerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
