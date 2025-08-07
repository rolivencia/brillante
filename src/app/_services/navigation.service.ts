import { Injectable } from '@angular/core';
import { EUserRole } from '@enums/user.enum';
import { NavigationLink } from '@components/main-header/main-header.component';
import {
    faBoxesStacked,
    faBuilding,
    faCashRegister,
    faChartLine,
    faCogs,
    faHome,
    faLayerGroup,
    faMobile,
    faNewspaper,
    faQuestion,
    faScrewdriver,
    faShop,
    faShoppingBag,
    faToolbox,
    faUser,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { routePaths } from '@app/app.routing';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    get allAdminLinks(): NavigationLink[] {
        return this._allAdminLinks;
    }

    private _allAdminLinks: NavigationLink[] = [
        {
            id: '2',
            text: 'Clientes',
            route: '/client-dashboard',
            enabled: true,
            visible: true,
            roles: [EUserRole.ADMIN, EUserRole.OWNER, EUserRole.COUNTER_CLERK],
            icon: faUsers,
            type: 'Internal',
        },
        {
            id: '3',
            text: 'Reparaciones',
            route: [`${routePaths.repair.path}/manage`],
            enabled: true,
            visible: true,
            roles: [EUserRole.ADMIN, EUserRole.OWNER, EUserRole.COUNTER_CLERK, EUserRole.REPAIRMAN, EUserRole.EMPLOYEE],
            icon: faScrewdriver,
            type: 'Internal',
        },
        {
            id: '4',
            text: 'Caja',
            route: ['/cash-dashboard/manage', { outlets: { left: 'grid', right: 'selected', top: null } }],
            enabled: true,
            visible: true,
            roles: [EUserRole.ADMIN, EUserRole.OWNER, EUserRole.COUNTER_CLERK, EUserRole.EMPLOYEE],
            icon: faCashRegister,
            type: 'Internal',
        },
        {
            id: '5',
            text: 'Stock',
            route: '/products-list-dashboard',
            enabled: true,
            visible: true,
            roles: [EUserRole.ADMIN, EUserRole.OWNER, EUserRole.COUNTER_CLERK, EUserRole.EMPLOYEE],
            icon: faBoxesStacked,
            type: 'Internal',
        },
        {
            id: '6',
            text: 'Punto de Venta',
            route: '/products-shop-dashboard',
            enabled: true,
            visible: true,
            roles: [EUserRole.ADMIN, EUserRole.OWNER, EUserRole.COUNTER_CLERK, EUserRole.EMPLOYEE],
            icon: faShop,
            type: 'Internal',
        },
        {
            id: '7',
            text: 'Gestor de Contenido',
            route: 'https://brillante-store.sanity.studio/',
            enabled: true,
            visible: true,
            roles: [EUserRole.ADMIN, EUserRole.OWNER, EUserRole.COUNTER_CLERK, EUserRole.EMPLOYEE],
            icon: faLayerGroup,
            type: 'External',
        },
        {
            id: '8',
            text: 'Configuración',
            route: '/settings-dashboard',
            enabled: true,
            visible: true,
            roles: [EUserRole.ADMIN, EUserRole.OWNER, EUserRole.COUNTER_CLERK, EUserRole.EMPLOYEE],
            icon: faCogs,
            type: 'Internal',
        },
        {
            id: '9',
            text: 'Reportes',
            route: '/reports-dashboard',
            enabled: true,
            visible: true,
            roles: [EUserRole.ADMIN, EUserRole.OWNER, EUserRole.ACCOUNTANT],
            icon: faChartLine,
            type: 'Internal',
        },
        {
            id: '107',
            text: 'Perfil de Usuario',
            route: 'user-profile',
            enabled: true,
            visible: true,
            roles: [
                EUserRole.ADMIN,
                EUserRole.OWNER,
                EUserRole.ACCOUNTANT,
                EUserRole.REPAIRMAN,
                EUserRole.EMPLOYEE,
                EUserRole.OWNER,
                EUserRole.COUNTER_CLERK,
                EUserRole.CUSTOMER,
            ],
            icon: faUser,
            type: 'Internal',
        },
    ];
}
