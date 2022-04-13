import {Router} from 'express';
import CursoController from "../app/controllers/CursoController";
const authMiddleware = require('../app/middlewares/auth');

const router = Router();
const curso = '/curso';

router.use(authMiddleware);

router.get(`${curso}/`, CursoController.list);
router.get(`${curso}/:cursoId`, CursoController.cursoId);
router.post(`${curso}/`, CursoController.create);
router.put(`${curso}/:cursoId`, CursoController.edit);
router.delete(`${curso}/:cursoId`, CursoController.delete);

export default router;
