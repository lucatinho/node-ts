import {Request, Response} from "express";

import CursoMateria from '../schemas/CursoMateria';
import Curso from "../schemas/Curso";
import Materia from "../schemas/Materia";

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
            const {curso, materia} = req.body;

            const cursoMateria = await CursoMateria.create(req.body);
            await Curso.updateMany({_id: curso}, {$push: {curso_materias: cursoMateria._id}});
            await Materia.updateMany({_id: materia}, {$push: {cursos: curso}})

            return res.send({cursoMateria});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }
    }

    public async editOrder(req: Request, res: Response): Promise<Response> {
        try {
            const {ordenacao} = req.body;
            let cursoMateriasOrder: Array<any> = new Array<any>();

            for await (let matOrder of ordenacao) {
                const id = matOrder._id;
                delete matOrder._id;
                let update = await CursoMateria.findByIdAndUpdate(id, matOrder, {new: true});
                if (!update) {
                    return res.status(400).send({error: 'Materia não encontrado'});
                }
                cursoMateriasOrder.push(update);
            }

            return res.send({cursoMateriasOrder});
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
            const {curso, materia} = req.body;

            const materiaBase = await CursoMateria.find({curso: curso});

            if (materiaBase[0]._id) {
                await CursoMateria.findByIdAndRemove(materiaBase[0]._id);
                await Curso.updateMany({_id: curso}, {$pull: {curso_materias: materiaBase[0]._id}});
                await Materia.updateMany({_id: materia}, {$pull: {cursos: curso}})
            } else {
                return res.status(400).send({error: 'Vinculo não encontrado!'});
            }

            return res.send({sucess: 'Removido com sucesso'});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }

    }
}

export default new CursoMateriaController()
