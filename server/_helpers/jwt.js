const expressJwt = require('express-jwt');
const environment = require('./environment');

module.exports = jwt;

function jwt() {
    const secret = environment.secret;
    return expressJwt({ secret }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/dashboard',
            '/login',
            '/cash/getPaymentMethods',
            new RegExp('/cash-dashboard/*', 'i'),
            new RegExp('/repair-dashboard/*', 'i'),
            new RegExp('/client-dashboard/*', 'i'),
            new RegExp('/cash-dashboard/*', 'i'),
            new RegExp('/products-list-dashboard/*', 'i'),
            new RegExp('/products/*', 'i'),
        ],
    });
}
