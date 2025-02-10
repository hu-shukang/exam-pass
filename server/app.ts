import { createRequestHandler } from '@react-router/express';
import { AsyncLocalStorage } from 'async_hooks';
import express from 'express';
import type { Logger } from 'pino';
import logger from 'pino-http';
import 'react-router';
import { prisma } from '~/.server/utils';

declare module 'react-router' {
  interface AppLoadContext {
    log: Logger<never, boolean>;
  }
}

export const app = express();

const asyncLocalStorage = new AsyncLocalStorage<{ log: Logger }>();

prisma.$on('query', (event) => {
  const store = asyncLocalStorage.getStore();
  if (store) {
    const { log } = store;
    log.info(`Prisma Query: ${event.query}`);
    log.info(`Prisma Params: ${event.params}`);
    log.info(`Prisma Duration: ${event.duration}ms`);
  }
});

app.use(
  logger({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: process.env.NODE_ENV !== 'production',
        translateTime: 'SYS:standard',
        ignore: 'req,res,responseTime,pid,hostname',
        messageFormat: '[reqId:{req.id}] - {msg}',
      },
    },
    genReqId: () => Math.random().toString(36).slice(2, 10),
    autoLogging: false,
  }),
);

app.use((req, _res, next) => {
  const context = { log: req.log };
  asyncLocalStorage.run(context, () => {
    next();
  });
});

app.use((req, res, next) => {
  const start = Date.now();
  req.log.info(`Incoming request: ${req.method} ${req.url}`);

  res.on('finish', () => {
    const duration = Date.now() - start;
    req.log.info(`Request completed in ${duration}ms`);
  });
  next();
});

app.use(
  createRequestHandler({
    // @ts-expect-error - virtual module provided by React Router at build time
    build: () => import('virtual:react-router/server-build'),
    getLoadContext(req) {
      return {
        log: req.log,
      };
    },
  }),
);
