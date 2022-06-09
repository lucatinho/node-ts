import {Request, Response} from "express";

import Turma from '../schemas/Turma';

class TurmaController {
    public async list(req: Request, res: Response): Promise<Response> {
        try {
            const turmas = await Turma.find().populate([{
                path: 'cursos',
                select: ['titulo']
            }]);

            return res.send({turmas});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }
    }

    public async turmaId(req: Request, res: Response): Promise<Response> {
        try {
            const turma = await Turma.findById(req.params.turmaId).populate([{
                path: 'users',
                select: ['name', 'email']
            }]);

            return res.send({turma});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }

    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const turma = await Turma.create(req.body);
            return res.send({turma});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }
    }

    // public async addRemovePersons(req: Request, res: Response): Promise<Response> {
    //     try {
    //         const turma = await Turma.create(req.body);
    //
    //
    //         return res.send({turma});
    //     } catch (err) {
    //         return res.status(400).send({error: 'Erro interno'});
    //     }
    // }

    public async edit(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body;

            const turma = await Turma.findByIdAndUpdate(req.params.turmaId, body, {new: true});
            if (!turma) {
                return res.status(400).send({error: 'Turma não encontrado'});
            }

            await turma.save();

            return res.send({turma});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }

    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            await Turma.findByIdAndRemove(req.params.turmaId);

            return res.send({sucess: 'Removido com sucesso'});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }

    }
}

export default new TurmaController()
