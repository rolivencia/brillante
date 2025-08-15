import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss'],
    standalone: false,
})
export class SearchInputComponent implements OnInit {
    @Output() search: EventEmitter<string> = new EventEmitter<string>();

    public text: string = '';

    constructor() {}

    ngOnInit(): void {}

    public focusIn(event): void {
        event.target.parentElement.classList.add('e-input-focus');
    }

    public focusOut(event): void {
        event.target.parentElement.classList.remove('e-input-focus');
    }

    public onMouseDown(event): void {
        event.target.classList.add('e-input-btn-ripple');
    }

    public onMouseUp(event): void {
        const ele: HTMLElement = event.target;
        setTimeout(() => {
            ele.classList.remove('e-input-btn-ripple');
        }, 500);
    }

    public onSubmitSearch(text: string) {
        this.search.emit(text);
    }

    public onKeyPress(event: KeyboardEvent, text: string) {
        if (event.code === 'Enter' || event.code === 'NumpadEnter') {
            this.search.emit(text);
        }
    }

    public clear() {
        this.text = '';
    }
}
