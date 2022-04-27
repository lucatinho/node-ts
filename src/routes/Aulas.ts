import {Router} from 'express';
import AulaController from "../app/controllers/AulaController";
import authorize from "../app/middlewares/authorize";
import {Roles} from "../app/enum/Roles";

const authMiddleware = require('../app/middlewares/auth');

const aula = Router();
const route_fix = '/aula';

aula.use(authMiddleware);

aula.get(`${route_fix}/`, AulaController.list);
aula.get(`${route_fix}/:aulaId`, AulaController.aulaId);
aula.post(`${route_fix}/`, AulaController.create);
aula.put(`${route_fix}/:aulaId`, AulaController.edit);
aula.delete(`${route_fix}/:aulaId`, authorize([Roles.ROLE_PARCAS]), AulaController.delete);

export default aula;
