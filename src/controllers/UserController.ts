import {Request, Response} from "express";
import EmailService from "../services/EmailService";

const users = [
    {name: 'asds', email: 'safddfdsf'}
]

export default {
    async index(req: Request, res: Response) {
        return res.json(users);
    },

    async create(req: Request, res: Response) {
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
};
