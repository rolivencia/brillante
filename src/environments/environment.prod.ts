export const environment = {
    production: true,
    apiUrl: '',
    auth0: {
        domain: 'brillantestore.us.auth0.com',
        clientId: '5JPVRa51TTPdWZz8y44WMoFuzLRjs2Sq',
        authorizationParams: {
            audience: 'https://brillantestore.us.auth0.com/api/v2/',
            redirect_uri: window.location.origin,
        },
        errorPath: '/callback',
    },
};
