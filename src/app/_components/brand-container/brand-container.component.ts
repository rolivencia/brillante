import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faBars, faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-brand-container',
    templateUrl: './brand-container.component.html',
    styleUrls: ['./brand-container.component.scss'],
})
export class BrandContainerComponent implements OnInit {
    @Input() sidebarOpen: boolean = false;
    @Input() showToggler: boolean = true;
    @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

    public barsIcon: IconDefinition = faBars;
    public closeIcon: IconDefinition = faTimes;

    constructor() {}

    ngOnInit(): void {}

    public onToggleSidebar() {
        this.toggleSidebar.emit(!this.sidebarOpen);
    }
}
