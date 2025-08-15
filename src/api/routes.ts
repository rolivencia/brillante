import express from 'express';

export type TControlledApiRoute = { path: 'string', controller: express.Router }
export default [] as TControlledApiRoute[];
