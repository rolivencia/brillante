import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftSidebarComponent } from './left-sidebar.component';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [LeftSidebarComponent],
    exports: [LeftSidebarComponent],
    imports: [CommonModule, ListViewModule, SidebarModule, RouterModule, FontAwesomeModule],
})
export class LeftSidebarModule {}
