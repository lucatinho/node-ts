import {Router} from 'express';
import CursoController from "../app/controllers/CursoController";
const authMiddleware = require('../app/middlewares/auth');
import authorize from '../app/middlewares/authorize'
import {Roles} from "../app/enum/Roles";

const curso = Router();
const route_fix = '/curso';

curso.use(authMiddleware);

curso.get(`${route_fix}/`, authorize([Roles.ALUNO]) ,CursoController.list);
curso.get(`${route_fix}/:cursoId`, CursoController.cursoId);
curso.post(`${route_fix}/`, CursoController.create);
curso.put(`${route_fix}/:cursoId`, CursoController.edit);
curso.delete(`${route_fix}/:cursoId`, CursoController.delete);

export default curso;
