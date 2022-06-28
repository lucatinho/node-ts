import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import authRotes from './routes/AuthRotes';
import curso from './routes/Cursos';
import roleRoutes from "./routes/RolesRoutes";
import materia from "./routes/Materias";
import aula from "./routes/Aulas";
import progressoRoutes from "./routes/ProgressoRoutes";
import cursoMateria from "./routes/CursoMaterias";
import userRoutes from "./routes/UserRotes";
import turma from "./routes/TurmaRoutes";

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
        // mongoose.connect('mongodb+srv://vibranium:L9XDa9bdKtTyBYkA@cluster0.shpnq.mongodb.net/?retryWrites=true&w=majority');
    }

    private routes(): void {
        this.express.use([authRotes, roleRoutes, userRoutes, curso, cursoMateria, materia, aula, turma, progressoRoutes]);
    }
}

export default new App().express;
