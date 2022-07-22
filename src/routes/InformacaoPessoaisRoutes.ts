import {Router} from 'express';
import InformacaoPessoaisController from "../app/controllers/InformacaoPessoaisController";

const authMiddleware = require('../app/middlewares/auth');

const InformacaoPessoais = Router();
const route_fix = '/info';

InformacaoPessoais.use(authMiddleware);

InformacaoPessoais.get(`${route_fix}/pessoais/:id`, InformacaoPessoaisController.infoPersonId);
InformacaoPessoais.get(`${route_fix}/user/:id`, InformacaoPessoaisController.infoUser);


export default InformacaoPessoais;
