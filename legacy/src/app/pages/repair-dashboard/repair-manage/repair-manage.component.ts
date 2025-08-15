import { Component, OnInit } from '@angular/core';
import { LayoutService } from '@services/layout.service';

@Component({
    selector: 'app-repair-manage',
    templateUrl: './repair-manage.component.html',
    styleUrls: ['./repair-manage.component.scss'],
    standalone: false,
})
export class RepairManageComponent implements OnInit {
    constructor(private layoutService: LayoutService) {}

    ngOnInit(): void {
        this.layoutService.useContainer.next(false);
    }
}
