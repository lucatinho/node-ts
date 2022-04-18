import {Request, Response} from "express";

import Materia from '../schemas/Materia';
import Curso from "../schemas/Curso";

class MateriaController {
    public async list(req: Request, res: Response): Promise<Response> {
        try {
            const materias = await Materia.find();

            return res.send({materias});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }
    }

    public async materiaId(req: Request, res: Response): Promise<Response> {
        try {
            const materia = await Materia.findById(req.params.materiaId).populate('aulas');

            if (!materia) {
                return res.status(400).send({error: 'Materia não encontrada'});
            }
            return res.send({materia});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }

    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const {curso, ordem} = req.body;
            if (!curso || !ordem) {
                return res.status(400).send({error: 'curso/ordem não informada'});
            }

            let cursoDB = await Curso.findById(curso[0]);
            // console.log(curso[0])

            if (!cursoDB) {
                return res.status(400).send({error: 'curso não encontrada'});
            }
            const materia = await Materia.create(req.body);

            const obj = {
                materia: materia._id,
                ordem: ordem
            }
            // const obj = {
            //     materia: '625dc2615d4d1f49cc2ed4c5',
            //     ordem: 1
            // }

            cursoDB.materias.push(obj);
            console.log(cursoDB.materias);

            const teste = await Materia.findByIdAndUpdate(curso[0], cursoDB, {new: true});
            console.log(teste);

            return res.send({materia});
            // return res.send({teste});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }
    }

    public async edit(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body;

            const materia = await Materia.findByIdAndUpdate(req.params.materiaId, body, {new: true});
            if (!materia) {
                return res.status(400).send({error: 'Materia não encontrado'});
            }

            await materia.save();

            return res.send({materia});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }

    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            await Materia.findByIdAndRemove(req.params.materiaId);

            return res.send({sucess: 'Removido com sucesso'});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }

    }
}

export default new MateriaController()
