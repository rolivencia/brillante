import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './_services';
import {User} from './_models';

import * as wjcCore from 'wijmo/wijmo';
wjcCore.setLicenseKey('988775697861712#B05eulUMp9WMJh6T0VUS5BTQCF6RrcWWhRXSGp7Rp94RwVHUrkVM5UETUtSR6QkYZN7YvxWMXRlaOBXNqN5b9UkUhlHMR56YCBlN4N7ZykHbQJje6AVdrBlRZJld994NlRXVKZkTuhGSyF7LwUDe9gmWvJWcCtiTygVcxMVQF5mcYBDR6o7TJVmYQZGMnVUeMtkcQNEM0tESytkUWBje6VHRHdTRqh7YxRXazlles3CbmdkUxYmY6MVRUZlQjFGW0ZmYVBDOslTZ5Q4S9AnYK36TwR7d4kmMjJFc7UmThpHTHF4RWdzUXJiOiMlIsIiRzEjRzIjQiojIIJCL6gTN6QzN4kDO0IicfJye#4Xfd5nIzMEMCJiOiMkIsISZy36Qg2Wbql6ViojIOJyebpjIkJHUiwiI8AzN4QDMgETMyEDOxAjMiojI4J7QiwiIDxETgE6cl5EbhV7cpZlI0ISYONkIsIiMxcTM6gzN9YTN7cDO8kjI0ICZJJCL3JyM6hTMwIjI0IiclZnIsU6csFmZ0IiczRmI1pjIs9WQisnOiQkIsISP3EUTzglWslXd4YTWQtGdndjerEkZhdVW8dkY5B5UWx6Z4JEbW54bulnTxIFaWZkNHRnewJDeqZWWZdTU7d6aL36Q4tiWTFDTMhEOM3EWx3yRztGSIZVTtN5VxokNkB5Q6YHeEBHOltibl3EZ5RqQwR');

@Component(
  {
    selector: 'app-brillante',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.scss']
  })
export class AppComponent implements OnInit {
  currentUser: User;

  // FIXME: Remove this and apply real checking of the user/pass controlling with the Wordpress Database
  private usersList: User[] = [
    {
      firstName: 'Ramiro',
      lastName: 'Olivencia',
      username: 'rolivencia',
      password: 'abacab@270156',
      id: 1,
      token: 'fake-jwt-token',
      avatar: '🧑🏻'
    },
    {
      firstName: 'Carlos',
      lastName: 'Barreto',
      username: 'cbarreto',
      password: 'Conestolarompemos3',
      id: 2,
      token: 'fake-jwt-token',
      avatar: '🧑🏿'
    },
  ];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    // localStorage.clear('users');
    localStorage.setItem('users', JSON.stringify(this.usersList));
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  get welcomeName() {
    return `${this.currentUser.avatar} ${this.currentUser.firstName}`;
  }
}
