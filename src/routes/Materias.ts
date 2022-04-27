import {Router} from 'express';
import MateriaController from "../app/controllers/MateriaController";
import authorize from "../app/middlewares/authorize";
import {Roles} from "../app/enum/Roles";

const authMiddleware = require('../app/middlewares/auth');

const materia = Router();
const route_fix = '/materia';

materia.use(authMiddleware);

materia.get(`${route_fix}/`, MateriaController.list);
materia.get(`${route_fix}/:materiaId`, MateriaController.materiaId);
materia.post(`${route_fix}/`, MateriaController.create);
materia.put(`${route_fix}/:materiaId`, MateriaController.edit);
materia.delete(`${route_fix}/:materiaId`, authorize([Roles.ROLE_PARCAS]), MateriaController.delete);

export default materia;
