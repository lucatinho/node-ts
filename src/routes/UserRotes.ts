import {Router} from 'express';
import UserController from "../app/controllers/UserController";
const authMiddleware = require('../app/middlewares/auth');

const userRoutes = Router();
const route_fix = '/auth';

userRoutes.use(authMiddleware);

userRoutes.get(`${route_fix}/by_token`, UserController.byToken);

export default userRoutes;
