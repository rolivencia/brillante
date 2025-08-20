import { Router } from 'express';
import officeBranchController from './modules/office-branch/office-branch.controller';

export type TControlledApiRoute = { path: string, controller: Router }
export default [
  // { path: '/users', controller: '' },
  { path: '/office-branch', controller: officeBranchController },
  // { path: '/client', controller: '' },
  // { path: '/repair', controller: '' },
  // { path: '/cash', controller: '' },
  // { path: '/cash/transaction', controller: '' },
  // { path: '/products', controller: '' },
] as TControlledApiRoute[];
