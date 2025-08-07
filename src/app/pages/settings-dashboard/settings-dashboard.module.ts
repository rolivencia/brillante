import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsDashboardRoutingModule } from './settings-dashboard-routing.module';
import { SettingsDashboardComponent } from './settings-dashboard.component';

@NgModule({
    declarations: [SettingsDashboardComponent],
    imports: [CommonModule, SettingsDashboardRoutingModule],
})
export class SettingsDashboardModule {}
