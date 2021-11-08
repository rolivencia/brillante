import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header.component';
import { MainHeaderService } from './main-header.service';
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [MainHeaderComponent],
    imports: [CommonModule, FontAwesomeModule, ListViewModule, RouterModule, SidebarModule],
    providers: [MainHeaderService],
    exports: [MainHeaderComponent],
})
export class MainHeaderModule {}