import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faShoppingCart, faTimes, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { OfficeBranchService } from '@services/office-branch.service';
import { User } from '@models/user';
import { AuthenticationService } from '@services/authentication.service';
import { FieldSettingsModel, SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { MainHeaderService } from '@components/main-header/main-header.service';

export interface NavigationLink {
    id: string;
    text: string;
    route: string | Object;
    enabled: boolean;
    visible: boolean;
    roles?: number[];
    icon?: IconDefinition;
}

@Component({
    selector: 'app-main-header',
    templateUrl: './main-header.component.html',
    styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
    @ViewChild('sidebar') sidebar: SidebarComponent;

    get welcomeName(): string {
        return `${this.currentUser.avatar} ${this.currentUser.firstName} ${this.currentUser.lastName}`;
    }

    get userLinks(): NavigationLink[] {
        return this.mainHeaderService.userLinks;
    }

    get adminLinks(): NavigationLink[] {
        return this._adminLinks;
    }

    currentUser: User;

    public barsIcon: IconDefinition = faBars;
    public closeIcon: IconDefinition = faTimes;
    public cartIcon: IconDefinition = faShoppingCart;
    public userIcon: IconDefinition = faUser;

    private _adminLinks: NavigationLink[] = [];

    public fields: FieldSettingsModel = { text: 'Name' };
    public showCart: boolean = true; //TODO: Remove this when cart module is ready

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        public officeBranchService: OfficeBranchService,
        public mainHeaderService: MainHeaderService
    ) {
        this.authenticationService.currentUser.subscribe((x) => (this.currentUser = x));
    }

    ngOnInit() {
        this.authenticationService.currentUserSubject.subscribe((user) => {
            if (user) {
                const currentUserRoles = user.roles.map((UserRole) => UserRole.id);
                this._adminLinks = this.mainHeaderService.allAdminLinks.filter((Link) =>
                    Link.roles.some((role) => currentUserRoles.includes(role))
                );
            }
            this.showCart = !!user;
        });
    }

    logout() {
        this.authenticationService.logout();
        this._adminLinks = [];
        this.sidebar.hide();
        this.router.navigate(['/']);
    }

    public onCreated() {
        this.sidebar.element.style.visibility = '';
    }

    public toggleSidebar() {
        this.sidebar.toggle();
    }

    public hideSidebar() {
        this.sidebar.hide();
    }
}
