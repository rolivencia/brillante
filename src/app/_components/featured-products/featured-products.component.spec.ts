import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FeaturedProductsComponent } from './featured-products.component';

describe('FeaturedProductsComponent', () => {
    let component: FeaturedProductsComponent;
    let fixture: ComponentFixture<FeaturedProductsComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [FeaturedProductsComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(FeaturedProductsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
