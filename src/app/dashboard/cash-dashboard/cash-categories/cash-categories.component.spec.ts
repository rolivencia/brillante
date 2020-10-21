import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashCategoriesComponent } from './cash-categories.component';

describe('CashCategoriesComponent', () => {
    let component: CashCategoriesComponent;
    let fixture: ComponentFixture<CashCategoriesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CashCategoriesComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CashCategoriesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
