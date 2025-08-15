import { LoaderState } from './progress-loader.component';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ProgressLoaderService {
    public loaderState: Observable<LoaderState>;

    private loaderSubject = new Subject<LoaderState>();

    constructor() {
        this.loaderState = this.loaderSubject.asObservable();
    }

    /**
     * Shows the loading indicator
     */
    show() {
        this.loaderSubject.next(<LoaderState>{ show: true, showWithOverlay: false });
    }

    /**
     * Shows the loading indicator, including an invisible overlay that prevents the user from clicking all the screen elements
     */
    showWithOverlay() {
        this.loaderSubject.next(<LoaderState>{ show: true, showWithOverlay: true });
    }

    /**
     * Hides the loading indicator and the invisible overlay
     */
    hide() {
        this.loaderSubject.next(<LoaderState>{ show: false, showWithOverlay: false });
    }
}
