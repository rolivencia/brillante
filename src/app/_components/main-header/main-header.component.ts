import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faShoppingCart, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { OfficeBranchService } from '@services/office-branch.service';
import { User } from '@models/user';
import { EUser } from '@enums/user.enum';
import { AuthenticationService } from '@services/authentication.service';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { MainHeaderService } from '@components/main-header/main-header.service';

export class NavigationLink {
    id: string;
    text: string;
    route: string | Object;
    enabled: boolean;
    visible: boolean;
    roles?: number[];
}

@Component({
    selector: 'app-main-header',
    templateUrl: './main-header.component.html',
    styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
    @ViewChild('sidebar') sidebar: SidebarComponent;

    get welcomeName() {
        return `${this.currentUser.avatar} ${this.currentUser.firstName} ${this.currentUser.lastName}`;
    }

    get userLinks() {
        return this.currentUser ? this._adminLinks : this.mainHeaderService.userLinks;
    }

    currentUser: User;

    public barsIcon: IconDefinition = faBars;
    public cartIcon: IconDefinition = faShoppingCart;
    public userIcon: IconDefinition = faUser;

    private _adminLinks: NavigationLink[] = [];

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
        });
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/']);
    }

    public onCreated(args: any) {
        this.sidebar.element.style.visibility = '';
    }

    public toggleSidebar() {
        this.sidebar.show();
    }
}
