import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import authRotes from './routes/AuthRotes';
import curso from './routes/Cursos';
import roleRoutes from "./routes/RolesRoutes";

class App {
    public express: express.Application;

    public constructor() {
        this.express = express();

        this.middlewares();
        this.database();
        this.routes();
    }

    private middlewares(): void {
        this.express.use(express.json());
        this.express.use(cors());
    }

    database(): void {
        mongoose.connect('mongodb://localhost/vibranium');
    }

    private routes(): void {
        this.express.use([authRotes, roleRoutes, curso]);
    }
}

export default new App().express;
