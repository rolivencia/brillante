import { auditTime } from 'rxjs/operators';
import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProgressLoaderService } from './progress-loader.service';

@Component({
    selector: 'app-progress-loader',
    templateUrl: './progress-loader.html',
    styleUrls: ['./progress-loader.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false,
})
export class ProgressLoaderComponent implements OnInit, OnDestroy {
    @Input() marginTop: number = 0; // Amount of pixels, counting from the top container, to display the progress bar
    @Input() height: number = 4;
    @Input() zIndex: number = 2000; // Z-index to apply on CSS styles to the progress loader
    @Input() delay: number = 500;

    public show: boolean = false;
    public showOverlay: boolean = false;

    private subscription: Subscription;

    constructor(private progressLoaderService: ProgressLoaderService) {}

    ngOnInit(): void {
        this.subscription = this.progressLoaderService.loaderState
            .pipe(auditTime(this.delay))
            .subscribe((state: LoaderState) => {
                this.show = state.show;
                this.showOverlay = state.showWithOverlay;
            });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

export interface LoaderState {
    show: boolean;
    showWithOverlay: boolean;
}
