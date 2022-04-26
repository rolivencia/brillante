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
    faUsers,
} from '@fortawesome/free-solid-svg-icons';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    get allAdminLinks(): NavigationLink[] {
        return this._allAdminLinks;
    }

    get userLinks(): NavigationLink[] {
        return this._userLinks;
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
            route: ['repair-dashboard', { outlets: { left: 'grid', right: 'selected', top: null } }],
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
    ];

    private _userLinks: NavigationLink[] = [
        { id: '100', text: 'Inicio', route: '/', enabled: true, visible: true, icon: faHome, type: 'Internal' },
        {
            id: '101',
            text: 'Productos',
            route: '/products',
            enabled: true,
            visible: true,
            icon: faShoppingBag,
            type: 'Internal',
        },
        {
            id: '102',
            text: 'Celulares',
            route: '/smartphones',
            enabled: false,
            visible: false,
            icon: faMobile,
            type: 'Internal',
        },
        {
            id: '103',
            text: 'Reparaciones',
            route: '/repairs',
            enabled: true,
            visible: true,
            icon: faToolbox,
            type: 'Internal',
        },
        {
            id: '104',
            text: 'Servicio a empresas',
            route: 'enterprise',
            enabled: true,
            visible: true,
            icon: faBuilding,
            type: 'Internal',
        },
        {
            id: '105',
            text: 'Novedades',
            route: 'news',
            enabled: false,
            visible: false,
            icon: faNewspaper,
            type: 'Internal',
        },
        {
            id: '106',
            text: 'Contacto',
            route: 'contact',
            enabled: true,
            visible: true,
            icon: faQuestion,
            type: 'Internal',
        },
    ];

    constructor() {}
}
