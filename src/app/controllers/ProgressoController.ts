import {Request, Response} from "express";

import Progresso from '../schemas/Progresso';
import TurmaProgresso from "../schemas/TurmaProgresso";

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

    public async progressoTurma(req: Request, res: Response): Promise<Response> {
        try {
            const progresso = await TurmaProgresso.find({turma: req.params.id}).populate({
                path: 'user',
                select: ['name', 'isActive', 'infoPerson']
            });

            return res.send({progresso});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }

    }


    public async create(req: Request | any, res: Response): Promise<Response> {
        try {
            if (req.body.progresso_geral.qtdAulaView === undefined) {
                return res.status(400).send({error: 'Informe a quantidade de aulas assistidas'});
            }

            req.body.progresso_unico.idcandidato = req.userId;
            const progresso = await Progresso.create(req.body.progresso_unico);

            let progressoTurmaUniq = await TurmaProgresso.findOne({user: req.userId});

            const body = {
                user: req.userId,
                turma: req.body.progresso_geral.idturma,
                progress: [
                    {
                        curso: req.body.progresso_unico.idcurso,
                        qtdAulaView: req.body.progresso_geral.qtdAulaView
                    }
                ]
            }
            // Se progresso existir
            if (progressoTurmaUniq) {
                // inicia o progress
                if (!progressoTurmaUniq.progress) {
                    progressoTurmaUniq.progress = [];
                }
                const valorExistente = progressoTurmaUniq.progress?.find(progress => String(progress.curso) === req.body.progresso_unico.idcurso);
                //se progress existir
                if (valorExistente) {
                    const index = progressoTurmaUniq.progress?.indexOf(valorExistente);
                    progressoTurmaUniq.progress[index].qtdAulaView = req.body.progresso_geral.qtdAulaView;
                } else {
                    progressoTurmaUniq.progress.push(body.progress[0]);
                }
                console.log(progressoTurmaUniq);
                await TurmaProgresso.findByIdAndUpdate(progressoTurmaUniq._id, progressoTurmaUniq, {new: true});
            } else {
                await TurmaProgresso.create(body);
            }

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
