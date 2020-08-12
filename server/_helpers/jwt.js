const expressJwt = require('express-jwt');
const config = require('server-config.json');

module.exports = jwt;

function jwt() {
    const { secret } = config;
    return expressJwt({ secret }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/dashboard',
            new RegExp('/cash-dashboard/*', 'i'),
            new RegExp('/repair-dashboard/*', 'i'),
            new RegExp('/client-dashboard/*', 'i'),
            new RegExp('/cash-dashboard/*', 'i'),
            new RegExp('/products-dashboard/*', 'i'),
        ],
    });
}
