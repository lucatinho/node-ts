import {Request, Response} from "express";

import InfoPerson from "../schemas/InfoPerson";
import User from "../schemas/User";
import Progresso from "../schemas/Progresso";

class InformacaoPessoaisController {
    public async infoPersonId(req: Request, res: Response): Promise<Response> {
        try {
            const infoPerson = await InfoPerson.findById(req.params.id);

            return res.send({infoPerson});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }
    }

    public async infoUser(req: Request, res: Response): Promise<Response> {
        try {
            const user = await User.findById(req.params.id).populate({
                path: 'infoPerson',
            });
            const progress = await Progresso.find({idcandidato: req.params.id}).populate([{
                path: 'idaula',
                select: ['titulo']
            }]).populate({path: 'idcurso', select: ['titulo']});

            return res.send({user, progress});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }
    }
}

export default new InformacaoPessoaisController()
