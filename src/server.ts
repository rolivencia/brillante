import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import routes from './api/routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import errorHandler from './api/_helpers/error-handler';
import jwt from './api/_helpers/jwt';
import environment from './api/_helpers/environment';

const browserDistFolder = join(import.meta.dirname, '../browser');

export function app() {

  const server = express();
  const angularApp = new AngularNodeAppEngine();

  // Set up middleware
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  server.use(cors());

  // global error handler
  server.use(errorHandler);

  // use JWT auth to secure the api
  // TODO: Recheck how this is achieved to easier testing
  if (environment.environment !== 'development'){
    server.use(jwt());
  }

  // api routes
  for (const route of routes) {
    server.use(`/api${route.path}`, route.controller);
  }

  /**
   * Serve static files from /browser
   */
  server.use(
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: false,
      redirect: false,
    }),
  );

  /**
   * Handle all other requests by rendering the Angular application.
   */
  server.use((req, res, next) => {
    angularApp
      .handle(req)
      .then((response) =>
        response ? writeResponseToNodeResponse(response, res) : next(),
      )
      .catch(next);
  });

  return server
}

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
const server = app();
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  server.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(server);
