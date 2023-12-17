import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import responseTime from 'response-time';
import { logInfo, logError } from './config/logging';

const server = express();
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(responseTime());

const NAMESPACE = 'Server';

server.use((req: Request, res: Response, next: NextFunction) => {
    /** Log the req */
    logInfo(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        logInfo(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });
    next();
});



process
    .on('unhandledRejection', (reason, p) => {
        logError(NAMESPACE, `Unhandled Rejection at Promise`, { reason, p })
    })
    .on('uncaughtException', err => {
        logError(NAMESPACE, `Uncaught Exception thrown`, err)
        process.exit(1);
    });

export default server