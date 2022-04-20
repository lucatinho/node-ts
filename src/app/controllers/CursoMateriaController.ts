import {Request, Response} from "express";

import CursoMateria from '../schemas/CursoMateria';

class CursoMateriaController {
    public async list(req: Request, res: Response): Promise<Response> {
        try {
            const cursoMaterias = await CursoMateria.find();

            return res.send({cursoMaterias});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }
    }

    public async cursoMateriaId(req: Request, res: Response): Promise<Response> {
        try {
            const cursoMateria = await CursoMateria.findById(req.params.cursoMateriaId);

            return res.send({cursoMateria});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }

    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const cursoMateria = await CursoMateria.create(req.body);

            return res.send({cursoMateria});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }
    }

    public async edit(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body;

            const cursoMateria = await CursoMateria.findByIdAndUpdate(req.params.cursoMateriaId, body, {new: true});
            if (!cursoMateria) {
                return res.status(400).send({error: 'CursoMateria não encontrado'});
            }

            await cursoMateria.save();

            return res.send({cursoMateria});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }

    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            await CursoMateria.findByIdAndRemove(req.params.cursoMateriaId);

            return res.send({sucess: 'Removido com sucesso'});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }

    }
}

export default new CursoMateriaController()
