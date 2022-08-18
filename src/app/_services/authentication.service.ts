import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Role, User } from '@models/user';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public currentUser: BehaviorSubject<User>;

    constructor(private auth0Service: AuthService, private http: HttpClient) {
        const localStorageUserData = JSON.parse(localStorage.getItem('currentUser'));
        const user = localStorageUserData ? new User(localStorageUserData) : null;
        this.currentUser = new BehaviorSubject<User>(user);
    }

    public get currentUserValue(): User {
        return this.currentUser.value;
    }

    public authenticateAgainstDatabase(user): Observable<User> {
        return this.http
            .post<any>(`${environment.apiUrl}/users/authenticate`, {
                user,
            })
            .pipe(
                map((result) => {
                    // login successful if there's a jwt token in the response
                    let loggedUser: User;
                    if (result && result.token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(result));
                        loggedUser = new User(result);
                        this.currentUser.next(loggedUser);
                    }

                    return loggedUser;
                })
            );
    }

    public redirectToLoginPortal() {
        this.auth0Service.loginWithRedirect();
    }

    /**
     * Obtains the email of the Auth0 active account and proceeds to
     * authenticate the app through the database.
     */
    public login(): Observable<User> {
        return this.auth0Service.user$.pipe(
            switchMap((user) => {
                if (!user) {
                    return of(null);
                }

                return this.authenticateAgainstDatabase(user);
            })
        );
    }

    public logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUser.next(null);
        this.auth0Service.logout({ federated: true });
    }
}

export function hasRoles(roles: Role[], rolesToCheck: number[]) {
    return roles.map((role) => role.id).filter((roleId) => rolesToCheck.includes(roleId)).length > 0;
}
