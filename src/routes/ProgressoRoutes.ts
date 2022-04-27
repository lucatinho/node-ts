import {Router} from 'express';
import authorize from '../app/middlewares/authorize'
import {Roles} from "../app/enum/Roles";
import ProgressoController from "../app/controllers/ProgressoController";

const authMiddleware = require('../app/middlewares/auth');


const progressoRoutes = Router();
const route_fix = '/progresso';

progressoRoutes.use(authMiddleware);

progressoRoutes.get(`${route_fix}/`, authorize([Roles.ROLE_PARCAS]) ,ProgressoController.list);
progressoRoutes.get(`${route_fix}/candidato/:id`, ProgressoController.progressoIdUsuario);
progressoRoutes.post(`${route_fix}/`, ProgressoController.create);
progressoRoutes.put(`${route_fix}/:progressoId`, authorize([Roles.ROLE_PARCAS]), ProgressoController.edit);
progressoRoutes.delete(`${route_fix}/:progressoId`, authorize([Roles.ROLE_PARCAS]), ProgressoController.delete);

export default progressoRoutes;
