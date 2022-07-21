import {Request, Response} from "express";

import Turma from '../schemas/Turma';
import mongoose from "mongoose";

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
            }]).populate({path: 'cursos', select: ['titulo']});

            return res.send({turma});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }

    }

    public async turmaIdverify(req: Request, res: Response): Promise<Response> {
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.turmaId)) {
                return res.status(204).send({error: 'Codigo de turma invalido.'});
            }
            const turma = await Turma.findById(req.params.turmaId);
            if (!turma) {
                return res.status(204).send({error: 'Turma não existe.'});
            }
            return res.send({nome: turma.nome});
        } catch (err) {
            return res.status(400).send({error: 'Turma não encontrada.'});
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
