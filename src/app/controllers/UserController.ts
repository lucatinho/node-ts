import {Request, Response} from "express";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import crypto from "crypto";

const authConfig = require('../../config/auth.json');
import User from '../schemas/User';
import Turma from "../schemas/Turma";
import EmailService from "../../services/EmailService";
import sgMail from "@sendgrid/mail";

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {expiresIn: 64800});
}

class UserController {
    public async register(req: Request, res: Response): Promise<Response> {
        const {email, turma} = req.body;
        try {
            if (await User.findOne({email})) {
                return res.status(400).send({error: 'Usuario ja existe'});
            }
            let turmaDb = await Turma.findById(turma);
            if (!turmaDb) {
                return res.status(400).send({error: 'Turma não encontrada'});
            }

            const user = await User.create(req.body);

            if (turmaDb.users === undefined) {
                turmaDb.users = new Array<any>();
            }
            turmaDb.users.push(user._id);
            await Turma.findByIdAndUpdate(turma,turmaDb, {new: true});

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
