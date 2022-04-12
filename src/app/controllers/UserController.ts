import {Request, Response} from "express";
import User from '../schemas/Users'
import EmailService from "../../services/EmailService";
import jwt from "jsonwebtoken";

const authConfig = require('../../config/auth.json');
import sqMail from "@sendgrid/mail";

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {expiresIn: 86400});
}

class UserController {
    public async index(req: Request, res: Response): Promise<Response> {
        const users = await User.find()

        return res.json(users)
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const user = await User.create(req.body)

        return res.json({
            ...user,
            fullName: user.fullName()
        })
    }

    public async email(req: Request, res: Response): Promise<Response> {
        const emailService = new EmailService();

        emailService.sendMail({
            to: {
                name: 'nome',
                email: 'email'
            },
            message: {
                subject: 'boa',
                body: 'body'
            }
        });
        return res.send();
    }

    public async post(req: Request, res: Response): Promise<Response> {
        const {email} = req.body;
        try {
            if (await User.findOne({email})) {
                return res.status(400).send({error: 'Usuario ja existe'});
            }

            const user = await User.create(req.body);

            user.password = undefined;

            return res.send({user, token: generateToken({id: user.id})});
        } catch (err) {
            return res.status(400).send({error: 'Falha no registro'});
        }
    }

}

export default new UserController()
