import { Injectable } from '@angular/core';
import { EUser } from '@enums/user.enum';
import { NavigationLink } from '@components/main-header/main-header.component';

@Injectable({
    providedIn: 'root',
})
export class MainHeaderService {
    get allAdminLinks(): NavigationLink[] {
        return this._allAdminLinks;
    }

    get userLinks(): NavigationLink[] {
        return this._userLinks;
    }

    private _allAdminLinks: NavigationLink[] = [
        {
            id: '1',
            text: 'Dashboard',
            route: '/dashboard',
            enabled: true,
            visible: true,
            roles: [EUser.ADMIN, EUser.OWNER, EUser.COUNTER_CLERK, EUser.REPAIRMAN, EUser.EMPLOYEE],
        },
        {
            id: '2',
            text: 'Clientes',
            route: '/client-dashboard',
            enabled: true,
            visible: true,
            roles: [EUser.ADMIN, EUser.OWNER, EUser.COUNTER_CLERK],
        },
        {
            id: '3',
            text: 'Reparaciones',
            route: ['repair-dashboard/manage', { outlets: { left: 'grid', right: 'selected', top: null } }],
            enabled: true,
            visible: true,
            roles: [EUser.ADMIN, EUser.OWNER, EUser.COUNTER_CLERK, EUser.REPAIRMAN, EUser.EMPLOYEE],
        },
        {
            id: '4',
            text: 'Caja',
            route: ['/cash-dashboard/manage', { outlets: { left: 'grid', right: 'selected', top: null } }],
            enabled: true,
            visible: true,
            roles: [EUser.ADMIN, EUser.OWNER, EUser.COUNTER_CLERK, EUser.EMPLOYEE],
        },
        {
            id: '5',
            text: 'Productos',
            route: '/products',
            enabled: true,
            visible: true,
            roles: [EUser.ADMIN, EUser.OWNER, EUser.COUNTER_CLERK, EUser.REPAIRMAN, EUser.EMPLOYEE],
        },
        // {
        //     label: 'Stock',
        //     route: '/products-list-dashboard',
        //     enabled: true,
        //     visible: true,
        //     roles: [EUser.ADMIN, EUser.OWNER, EUser.COUNTER_CLERK, EUser.REPAIRMAN, EUser.EMPLOYEE],
        // },
        {
            id: '6',
            text: 'Configuración',
            route: '/settings-dashboard',
            enabled: true,
            visible: true,
            roles: [EUser.ADMIN, EUser.OWNER, EUser.COUNTER_CLERK],
        },
    ];

    private _userLinks: NavigationLink[] = [
        { id: '100', text: 'Inicio', route: '/home', enabled: true, visible: false },
        { id: '101', text: 'Productos', route: '/products', enabled: true, visible: true },
        { id: '102', text: 'Celulares', route: '/smartphones', enabled: false, visible: false },
        { id: '103', text: 'Reparaciones', route: '/repairs', enabled: true, visible: true },
        {
            id: '104',
            text: 'Servicio a empresas',
            route: 'enterprise',
            enabled: true,
            visible: true,
        },
        { id: '105', text: 'Novedades', route: 'news', enabled: false, visible: true },
        { id: '106', text: 'Contacto', route: 'contact', enabled: true, visible: true },
    ];

    constructor() {}
}
