import {Request, Response} from "express";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import crypto from "crypto";

import User from '../schemas/User';
import Turma from "../schemas/Turma";
import EmailService from "../../services/EmailService";
import sgMail from "@sendgrid/mail";
import InfoPerson from "../schemas/InfoPerson";
import Endereco from "../schemas/Endereco";

function generateToken(params = {}) {
    return jwt.sign(params, 'c61aac68ee4d04dd8b272d1ef3740adf', {expiresIn: 64800});
}

class UserController {
    public async register_user_content_info_person(req: Request, res: Response): Promise<Response> {
        const {email, turma, cpf, infoPerson} = req.body;
        try {

            /* verify -> email */
            if (await User.findOne({email})) {
                return res.status(400).send({error: 'Usuario ja existe'});
            }
            /* verify -> CPF */
            if (await InfoPerson.findOne({cpf})) {
                return res.status(400).send({error: 'Usuario ja existe'});
            }
            /* verify -> Turma */
            let turmaDb = await Turma.findById(turma);
            if (!turmaDb) {
                return res.status(400).send({error: 'Turma não encontrada'});
            }
            /* ! verify */

            /* Save Info Person */
            let enderecoTemp = infoPerson.endereco;
            delete infoPerson.endereco;
            let infoPersonReq = await InfoPerson.create(infoPerson);

            /* Save Endereco -> esta salvando somente o primeiro endereco*/
            enderecoTemp[0].user = infoPersonReq._id;
            const endereco = await Endereco.create(enderecoTemp[0]);

            /* Vincular Endereco -> InfoPerson */
            if (infoPersonReq.endereco === undefined) {
                infoPersonReq.endereco = new Array<any>();
            }
            infoPersonReq.endereco.push(endereco._id);
            await InfoPerson.findByIdAndUpdate(infoPersonReq._id, infoPersonReq, {new: true});

            /* Save User */
            let objUser = req.body;
            objUser.infoPerson = infoPersonReq._id;
            const user = await User.create(objUser);

            /* Atualizar turma */
            if (turmaDb.users === undefined) {
                turmaDb.users = new Array<any>();
            }
            turmaDb.users.push(user._id);
            await Turma.findByIdAndUpdate(turma, turmaDb, {new: true});

            /* Retorno */
            user.password = undefined!;

            return res.send({user, token: generateToken({id: user.id})});
        } catch (err) {
            return res.status(400).send({error: 'Falha no registro'});
        }
    }

    public async register_user_adm(req: Request, res: Response): Promise<Response> {
        const {email} = req.body;
        try {
            /* verify -> email */
            if (await User.findOne({email})) {
                return res.status(400).send({error: 'Usuario ja existe'});
            }
            /* ! verify */

            /* Save User */
            const user = await User.create(req.body);
            /* Retorno */
            user.password = undefined!;

            return res.send({user, token: generateToken({id: user.id})});
        } catch (err) {
            return res.status(400).send({error: 'Falha no registro'});
        }
    }

    public async authenticate(req: Request, res: Response): Promise<Response> {
        const {email, password} = req.body;

        const user = await User.findOne({email}).select('+password');

        if (!user) {
            return res.status(400).send({error: 'usuario não encontrado'});
        }

        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).send({error: 'Senha invalida'});
        }

        user.password = undefined!;

        return res.send({user, token: generateToken({id: user.id})});
    }

    public async byToken(req: Request | any, res: Response): Promise<Response> {
        const user = await User.findOne({_id: req.userId});

        if (!user) {
            return res.status(400).send({error: 'usuario não encontrado'});
        }

        user.password = undefined!;

        return res.send({user});
    }

    public async forgot_password(req: Request, res: Response): Promise<any> {
        const {email} = req.body;
        try {
            const user = await User.findOne({email});

            if (!user) {
                return res.status(200).send({error: 'Usuario nao encontrado'});
            }

            const token = crypto.randomBytes(20).toString('hex');
            const now = new Date();

            now.setHours(now.getHours() + 1);

            await User.findByIdAndUpdate(user.id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now
                }
            })

            const emailService = new EmailService();
            const msg = emailService.sendMail_forgot_password(email, token);

            sgMail.send(msg)
                .then(() => {
                    return res.status(200).send({sucess: 'Email enviado'});
                })
                .catch((error) => {
                    return res.status(400).send({error: error});
                });
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }

    }

    public async reset_password(req: Request, res: Response): Promise<Response> {
        const {email, token, password} = req.body;

        try {
            const user = await User.findOne({email}).select('+passwordResetToken passwordResetExpires');

            if (!user) {
                return res.status(200).send({error: 'Email not found'});
            }

            if (token !== user.passwordResetToken) {
                return res.status(200).send({error: 'Token invalido'});
            }

            const now = new Date();
            if (now > user.passwordResetExpires) {
                return res.status(200).send({error: 'Token Expirou'});
            }

            user.password = password;

            await user.save();

            return res.status(200).send({sucess: 'Atualizado com sucesso'});

        } catch (err) {
            return res.status(400).send({error: 'Não foi possivel resetar a senha no momento'});
        }
    }

}

export default new UserController()
