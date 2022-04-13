import {Router} from 'express';
import UserController from "../app/controllers/UserController";
// import CursoController from "../app/controllers/CursoController";

const authRotes = Router();
const auth = '/auth';
// const curso = '/curso';

authRotes.post(`${auth}/register`, UserController.register);
authRotes.post(`${auth}/authenticate`, UserController.authenticate);
authRotes.post(`${auth}/forgot_password`, UserController.forgot_password);
authRotes.post(`${auth}/reset_password`, UserController.reset_password);

// authRotes.get(`${curso}/`, CursoController.list);
// authRotes.get(`${curso}/:cursoId`, CursoController.cursoId);
// authRotes.post(`${curso}/`, CursoController.create);
// authRotes.put(`${curso}/:cursoId`, CursoController.edit);
// authRotes.delete(`${curso}/:cursoId`, CursoController.delete);

export default authRotes
