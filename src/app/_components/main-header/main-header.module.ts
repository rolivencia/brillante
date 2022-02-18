import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header.component';
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { BrandContainerComponent } from '@components/brand-container/brand-container.component';

@NgModule({
    declarations: [MainHeaderComponent, BrandContainerComponent],
    imports: [CommonModule, FontAwesomeModule, ListViewModule, RouterModule, SidebarModule, NgbDropdownModule],
    exports: [MainHeaderComponent, BrandContainerComponent],
})
export class MainHeaderModule {}
