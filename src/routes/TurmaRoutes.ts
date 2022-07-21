import {Router} from 'express';

import authorize from "../app/middlewares/authorize";
import {Roles} from "../app/enum/Roles";
import TurmaController from "../app/controllers/TurmaController";
import ProgressoController from "../app/controllers/ProgressoController";
import progressoRoutes from "./ProgressoRoutes";

const authMiddleware = require('../app/middlewares/auth');

const turma = Router();
const route_fix = '/turma';

turma.use(authMiddleware);

turma.get(`${route_fix}/`, TurmaController.list);
turma.get(`${route_fix}/:turmaId`, TurmaController.turmaId);
progressoRoutes.get(`${route_fix}/progresso/:id`, ProgressoController.progressoTurma);
turma.post(`${route_fix}/`, authorize([Roles.ROLE_PARCAS]), TurmaController.create);
turma.put(`${route_fix}/:turmaId`, authorize([Roles.ROLE_PARCAS]), TurmaController.edit);
turma.delete(`${route_fix}/:turmaId`, authorize([Roles.ROLE_PARCAS]), TurmaController.delete);

export default turma;
