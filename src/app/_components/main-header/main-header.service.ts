import { Injectable } from '@angular/core';
import { EUser } from '@enums/user.enum';
import { NavigationLink } from '@components/main-header/main-header.component';
import {
    faBuilding,
    faCashRegister,
    faCogs,
    faColumns,
    faHome,
    faMobile,
    faNewspaper,
    faQuestion,
    faShoppingBag,
    faToolbox,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';

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
            icon: faColumns,
        },
        {
            id: '2',
            text: 'Clientes',
            route: '/client-dashboard',
            enabled: true,
            visible: true,
            roles: [EUser.ADMIN, EUser.OWNER, EUser.COUNTER_CLERK],
            icon: faUsers,
        },
        {
            id: '3',
            text: 'Reparaciones',
            route: ['repair-dashboard/manage', { outlets: { left: 'grid', right: 'selected', top: null } }],
            enabled: true,
            visible: true,
            roles: [EUser.ADMIN, EUser.OWNER, EUser.COUNTER_CLERK, EUser.REPAIRMAN, EUser.EMPLOYEE],
            icon: faToolbox,
        },
        {
            id: '4',
            text: 'Caja',
            route: ['/cash-dashboard/manage', { outlets: { left: 'grid', right: 'selected', top: null } }],
            enabled: true,
            visible: true,
            roles: [EUser.ADMIN, EUser.OWNER, EUser.COUNTER_CLERK, EUser.EMPLOYEE],
            icon: faCashRegister,
        },
        // {
        //     id: '5',
        //     text: 'Stock',
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
            roles: [EUser.ADMIN, EUser.OWNER, EUser.COUNTER_CLERK, EUser.EMPLOYEE],
            icon: faCogs,
        },
    ];

    private _userLinks: NavigationLink[] = [
        { id: '100', text: 'Inicio', route: '/', enabled: true, visible: true, icon: faHome },
        { id: '101', text: 'Productos', route: '/products', enabled: true, visible: true, icon: faShoppingBag },
        { id: '102', text: 'Celulares', route: '/smartphones', enabled: false, visible: false, icon: faMobile },
        { id: '103', text: 'Reparaciones', route: '/repairs', enabled: true, visible: true, icon: faToolbox },
        {
            id: '104',
            text: 'Servicio a empresas',
            route: 'enterprise',
            enabled: true,
            visible: true,
            icon: faBuilding,
        },
        { id: '105', text: 'Novedades', route: 'news', enabled: false, visible: false, icon: faNewspaper },
        { id: '106', text: 'Contacto', route: 'contact', enabled: true, visible: true, icon: faQuestion },
    ];

    constructor() {}
}
