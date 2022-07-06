// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    // apiUrl: "http://brillante-server.herokuapp.com"
    // apiUrl: 'https://localhost:443',
    apiUrl: 'http://localhost:4000',
    auth0: {
        domain: 'dev-0wyaah0g.us.auth0.com',
        clientId: '9qi6RSZk0xYtttld6Z9W9wpxlCIXf2YN',
    },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
