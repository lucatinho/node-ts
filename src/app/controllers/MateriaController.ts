import {Request, Response} from "express";

import Materia from '../schemas/Materia';
import Curso from "../schemas/Curso";
import Curso_Materia from "../schemas/CursoMateria";

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
            if (!curso || ordem === undefined) {
                return res.status(400).send({error: 'curso/ordem não informada'});
            }

            let cursoDB = await Curso.findById(curso);

            if (!cursoDB) {
                return res.status(400).send({error: 'curso não encontrada'});
            }

            const objMateria = req.body;
            delete objMateria.curso;
            objMateria.cursos = [curso];
            // const materia = await Materia.create(req.body);
            const materia = await Materia.create(objMateria);

            const obj = {
                curso: curso,
                materia: materia._id,
                ordem: ordem
            }

            const cursoMateria = await Curso_Materia.create(obj);

            cursoDB.curso_materias.push(cursoMateria._id);

            await Curso.findByIdAndUpdate(curso, cursoDB, {new: true});

            // console.log(materia);
            console.log(cursoMateria);
            // console.log(cursoDB);

            return res.send({cursoMateria});
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
