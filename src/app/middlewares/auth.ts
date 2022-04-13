import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

const authConfig = require('../../config/auth.json');


module.exports = (req: Request | any, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({error: 'Token não informado'});
    }
    const parts = authHeader.split(' ');

    if (!(parts.length === 2)) {
        return res.status(401).send({error: 'Token error'});
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({error: 'Token mal formatado'});
    }

    jwt.verify(token, authConfig.secret, (err: any, decode: any) => {
        if (err) {
            return res.status(401).send({error: 'Token invalido'});
        }
        req.userId = decode.id;
        return next();
    })
};
