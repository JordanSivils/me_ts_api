import express from 'express';
import cors from 'cors'
import compression from 'compression';
import dotenv from 'dotenv'
import v1Router from './api/v1.routes'
import { clerkMiddleware } from '@clerk/express';
import { handleError } from './utils/error/errorHandling';

const createApp = () => {
    const app = express();

    dotenv.config()
    app.use(clerkMiddleware())
    app.use(express.json())
    app.use(cors({
        origin: process.env.CORS_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }))
    app.use(compression())

    app.use("/api/v1/", v1Router);

    app.use(handleError)

    return app
}

export const app = createApp();

