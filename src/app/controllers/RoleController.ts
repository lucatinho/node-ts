import {Request, Response} from "express";

import User from "../schemas/User";
import {Roles} from "../enum/Roles";

class RoleController {

    public async listRoles(req: Request, res: Response): Promise<Response> {
        try {
            return res.status(200).send({Roles});
        } catch (err) {
            return res.status(400).send({error: 'Não foi listar as permissões'});
        }
    }

    public async setRoles(req: Request, res: Response): Promise<Response> {
        try {
            const {email, roles} = req.body;
            const body = req.body;

            if (!roles) {
                return res.status(400).send({error: 'Role not found'});
            }

            body.roles = roles;
            const user = await User.findOneAndUpdate({email}, body, {new: true});

            if (!user) {
                return res.status(400).send({error: 'Email not found'});
            }

            return res.status(200).send({user});

        } catch (err) {
            return res.status(400).send({error: 'Não foi possivel alterar a permissão'});
        }
    }

}

export default new RoleController()
