import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home';
import {LoginComponent} from './login';
import {AuthGuard} from './_guards';
import {ClientDashboardModule} from '@app/views/client-dashboard/client-dashboard.module';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'repair',
    loadChildren: () =>
      import('./views/repair-dashboard/repair-dashboard.module').then(
        m => m.RepairDashboardModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'client',
    loadChildren: () =>
      import('./views/client-dashboard/client-dashboard.module').then(
        m => ClientDashboardModule
      ),
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
