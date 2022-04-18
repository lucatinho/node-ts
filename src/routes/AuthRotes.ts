import {Router} from 'express';
import UserController from "../app/controllers/UserController";

const authRotes = Router();
const route_fix = '/auth';

authRotes.post(`${route_fix}/register`, UserController.register);
authRotes.post(`${route_fix}/authenticate`, UserController.authenticate);
authRotes.post(`${route_fix}/forgot_password`, UserController.forgot_password);
authRotes.post(`${route_fix}/reset_password`, UserController.reset_password);

export default authRotes;
