import {Router} from 'express';
import UserController from "../app/controllers/UserController";
import TurmaController from "../app/controllers/TurmaController";

const authRotes = Router();
const route_fix = '/auth';

authRotes.post(`${route_fix}/register`, UserController.register_user_content_info_person);
authRotes.post(`${route_fix}/register_not_infoperson`, UserController.register_not_infoperson);
authRotes.post(`${route_fix}/authenticate`, UserController.authenticate);
authRotes.post(`${route_fix}/forgot_password`, UserController.forgot_password);
authRotes.post(`${route_fix}/reset_password`, UserController.reset_password);


authRotes.get(`${route_fix}/verify_turma/:turmaId`, TurmaController.turmaIdverify);

export default authRotes;
