import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import authRotes from './routes/AuthRotes';
import rotes from './routes/Rotes';

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
        this.express.use([authRotes, rotes]);
    }
}

export default new App().express;
