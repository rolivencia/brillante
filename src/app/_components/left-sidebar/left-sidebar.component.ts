import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '@models/user';
import { AuthenticationService } from '@services/authentication.service';
import { NavigationService } from '@services/navigation.service';
import { NavigationLink } from '@components/main-header/main-header.component';
import { OfficeBranchService } from '@services/office-branch.service';
import { Router } from '@angular/router';
import { FieldSettingsModel } from '@syncfusion/ej2-angular-navigations';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-left-sidebar',
    templateUrl: './left-sidebar.component.html',
    styleUrls: ['./left-sidebar.component.scss'],
})
export class LeftSidebarComponent implements OnInit, AfterViewInit {
    @Output() hide: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() logout: EventEmitter<boolean> = new EventEmitter<boolean>();

    get userLinks(): NavigationLink[] {
        return this.navigationService.userLinks;
    }

    get adminLinks(): NavigationLink[] {
        return this._adminLinks;
    }

    public fields: FieldSettingsModel = { text: 'Name' };

    public currentUser$: Observable<User>;
    private _adminLinks: NavigationLink[] = [];

    constructor(
        private authenticationService: AuthenticationService,
        private navigationService: NavigationService,
        public officeBranchService: OfficeBranchService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.currentUser$ = this.authenticationService.currentUser;
        this.authenticationService.currentUser.subscribe((user) => {
            if (user) {
                const currentUserRoles = user.roles.map((UserRole) => UserRole.id);
                this._adminLinks = this.navigationService.allAdminLinks.filter((Link) => {
                    // If no roles are defined, then it means access should be available for all roles
                    if (!Link.roles || Link.roles.length === 0) {
                        return true;
                    }
                    return Link.roles.some((role) => currentUserRoles.includes(role));
                });
            }
        });
    }

    ngAfterViewInit(): void {}

    public onLogout() {
        this.authenticationService.logout();
        this._adminLinks = [];
        this.onHide();
        this.logout.emit();
        this.router.navigate(['/']);
    }

    public onHide() {
        if (window.innerWidth < 768) {
            this.hide.emit(true);
        }
    }
}
