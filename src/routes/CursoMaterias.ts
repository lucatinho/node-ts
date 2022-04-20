import {Router} from 'express';
import CursoMateriaController from "../app/controllers/CursoMateriaController";
const authMiddleware = require('../app/middlewares/auth');
import authorize from '../app/middlewares/authorize'
import {Roles} from "../app/enum/Roles";

const cursoMateria = Router();
const route_fix = '/cursoMateria';

cursoMateria.use(authMiddleware);

cursoMateria.get(`${route_fix}/`, authorize([Roles.ALUNO]) ,CursoMateriaController.list);
cursoMateria.get(`${route_fix}/:cursoMateriaId`, CursoMateriaController.cursoMateriaId);
cursoMateria.post(`${route_fix}/`, CursoMateriaController.create);
cursoMateria.put(`${route_fix}/:cursoMateriaId`, CursoMateriaController.edit);
cursoMateria.delete(`${route_fix}/:cursoMateriaId`, authorize([Roles.ADMIN]), CursoMateriaController.delete);

export default cursoMateria;
