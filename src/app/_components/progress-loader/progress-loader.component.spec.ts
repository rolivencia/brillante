import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProgressLoaderComponent } from './progress-loader.component';
import { ProgressLoaderModule } from './progress-loader.module';

describe('ProgressLoaderComponent', () => {
    let component: ProgressLoaderComponent;
    let fixture: ComponentFixture<ProgressLoaderComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [ProgressLoaderModule],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ProgressLoaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
