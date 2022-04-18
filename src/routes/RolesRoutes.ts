import {Router} from 'express';

const authMiddleware = require('../app/middlewares/auth');
import authorize from '../app/middlewares/authorize'
import {Roles} from "../app/enum/Roles";
import RoleController from "../app/controllers/RoleController";


const roleRoutes = Router();
const route_fix = '/role';

roleRoutes.use(authMiddleware);

roleRoutes.get(`${route_fix}`, authorize([Roles.ADMIN]), RoleController.listRoles);
roleRoutes.put(`${route_fix}/alt_user_role`, authorize([Roles.ADMIN]), RoleController.setRoles);

export default roleRoutes;
