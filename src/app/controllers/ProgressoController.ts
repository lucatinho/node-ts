import {Request, Response} from "express";

import Progresso from '../schemas/Progresso';

class ProgressoController {
    public async list(req: Request, res: Response): Promise<Response> {
        try {
            const progressos = await Progresso.find();

            return res.send({progressos});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }
    }

    public async progressoIdUsuario(req: Request, res: Response): Promise<Response> {
        try {
            const progresso = await Progresso.find({idcandidato: req.params.id});

            return res.send({progresso});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }

    }

    public async create(req: Request | any, res: Response): Promise<Response> {
        try {
            req.body.idcandidato = req.userId;
            const progresso = await Progresso.create(req.body);

            // const progressoTurmaUniq = await TurmaProgresso.findOne({user: req.userId});

            // if (progressoTurmaUniq) {
            //     console.log(progressoTurmaUniq);
            //     // const body = {
            //     //     user: req.userId,
            //     //     turma: req.body.turma,
            //     //     progress: [
            //     //         {
            //     //             curso: req.body.idcurso,
            //     //             qtdAulaView: req.body.qtdAulaView,
            //     //             atrasado: false
            //     //         }
            //     //     ]
            //     // }
            //     // await TurmaProgresso.create(body);
            // } else {
            //     const body = {
            //         user: req.userId,
            //         turma: req.body.turma,
            //         progress: [
            //             {
            //                 curso: req.body.idcurso,
            //                 qtdAulaView: req.body.qtdAulaView,
            //                 atrasado: false
            //             }
            //         ]
            //     }
            //     await TurmaProgresso.create(body);
            // }

            return res.send({progresso});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }
    }

    public async edit(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body;

            const progresso = await Progresso.findByIdAndUpdate(req.params.progressoId, body, {new: true});
            if (!progresso) {
                return res.status(400).send({error: 'Progresso não encontrado'});
            }

            await progresso.save();

            return res.send({progresso});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }

    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            await Progresso.findByIdAndRemove(req.params.progressoId);

            return res.send({sucess: 'Removido com sucesso'});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }

    }
}

export default new ProgressoController()
