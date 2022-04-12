import {Router} from 'express';
import UserController from "./app/controllers/UserController";

const routes = Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);
routes.get('/users/email', UserController.email);
routes.post('/auth/register', UserController.post);

export default routes
