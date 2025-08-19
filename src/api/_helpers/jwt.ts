import { expressjwt } from 'express-jwt';
import environment from './environment';

function jwt() {
    const secret = environment.secret;

    return expressjwt({
        secret,
        algorithms: ['HS256']
    }).unless({
        path: [
            // public routes that don't require authentication
            '/',
            '/users/authenticate',
            '/dashboard',
            '/login',
            '/users/register',
            '/cash/getPaymentMethods',
            '/repair/getStatusData',
            new RegExp('/cash-dashboard/*', 'i'),
            new RegExp('/repair/*', 'i'),
            new RegExp('/client-dashboard/*', 'i'),
            new RegExp('/cash-dashboard/*', 'i'),
            new RegExp('/products-list-dashboard/*', 'i'),
            new RegExp('/products/*', 'i'),
        ],
    });
}

export default jwt;
