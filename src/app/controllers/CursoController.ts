import {Request, Response} from "express";

import Curso from '../schemas/Curso';

class CursoController {
    public async list(req: Request, res: Response): Promise<Response> {
        try {
            const cursos = await Curso.find();

            return res.send({cursos});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }
    }

    public async cursoId(req: Request, res: Response): Promise<Response> {
        try {
            const curso = await Curso.findById(req.params.cursoId);

            return res.send({curso});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }

    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const curso = await Curso.create(req.body);

            return res.send({curso});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }
    }

    public async edit(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body;

            const curso = await Curso.findByIdAndUpdate(req.params.cursoId, body, {new: true});
            if (!curso) {
                return res.status(400).send({error: 'Curso não encontrado'});
            }

            await curso.save();

            return res.send({curso});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }

    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            await Curso.findByIdAndRemove(req.params.cursoId);

            return res.send({sucess: 'Removido com sucesso'});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }

    }
}

export default new CursoController()
