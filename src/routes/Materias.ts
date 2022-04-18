import {Router} from 'express';
import MateriaController from "../app/controllers/MateriaController";

const authMiddleware = require('../app/middlewares/auth');

const materia = Router();
const route_fix = '/materia';

materia.use(authMiddleware);

materia.get(`${route_fix}/`, MateriaController.list);
materia.get(`${route_fix}/:materiaId`, MateriaController.materiaId);
materia.post(`${route_fix}/`, MateriaController.create);
materia.put(`${route_fix}/:materiaId`, MateriaController.edit);
materia.delete(`${route_fix}/:materiaId`, MateriaController.delete);

export default materia;
