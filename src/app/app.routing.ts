﻿import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import {RepairDashboardComponent} from '@app/views/repair-dashboard/repair-dashboard.component';
import {ClientDashboardComponent} from '@app/views/client-dashboard/client-dashboard.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'repair', component: RepairDashboardComponent, canActivate: [AuthGuard] },
    { path: 'client', component: ClientDashboardComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    // { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
