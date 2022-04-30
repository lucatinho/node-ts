import {Request, Response} from "express";

import Aula from '../schemas/Aula';
import Materia from "../schemas/Materia";

class AulaController {
    public async list(req: Request, res: Response): Promise<Response> {
        try {
            const aulas = await Aula.find();

            return res.send({aulas});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }
    }

    public async aulaId(req: Request, res: Response): Promise<Response> {
        try {
            const aula = await Aula.findById(req.params.aulaId);

            return res.send({aula});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }

    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const {materia} = req.body;
            if (!materia) {
                return res.status(400).send({error: 'materia não informada'});
            }

            let materiaDB = await Materia.findById(materia);
            if (!materiaDB) {
                return res.status(400).send({error: 'materia não encontrada'});
            }

            const aula = await Aula.create(req.body);

            materiaDB.aulas.push(aula._id);
            await Materia.findByIdAndUpdate(materia, materiaDB, {new: true});

            return res.send({aula});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }
    }

    public async edit(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body;

            const aula = await Aula.findByIdAndUpdate(req.params.aulaId, body, {new: true});
            if (!aula) {
                return res.status(400).send({error: 'Aula não encontrado'});
            }

            await aula.save();

            return res.send({aula});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }

    }

    public async ordemAulas(req: Request, res: Response): Promise<Response> {
        try {
            const {ordenacao} = req.body;
            let aulaOrdem: Array<any> = new Array<any>();


            for await (let aulOrder of ordenacao) {
                const id = aulOrder._id;

                delete aulOrder._id;
                let update = await Aula.findByIdAndUpdate(id, aulOrder, {new: true});
                if (!update) {
                    return res.status(400).send({error: 'Aula não encontrado'});
                }
                aulaOrdem.push(update);
            }

            return res.send({aulaOrdem});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            await Aula.findByIdAndRemove(req.params.aulaId);

            return res.send({sucess: 'Removido com sucesso'});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }

    }
}

export default new AulaController()
