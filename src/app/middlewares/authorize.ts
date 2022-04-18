import {Request, Response, NextFunction} from "express";
import User from "../schemas/Users";
import {Roles} from "../enum/Roles";

function authorize(allowedRoles: Array<Roles>) {
    return async (req: Request | any, res: Response, next: NextFunction) => {

        const user = await User.findOne({_id: req.userId});
        if (!user) {
            return res.status(404).send({error: 'Token sem permissão'});
        }

        if (!isAuthorized(user.roles, allowedRoles)) {
            return res.status(403).send({error: 'Usuario sem permissão'});
        }

        next();
    };
}

function isAuthorized(userRoles: Array<Roles>, allowedRoles: Array<Roles>): boolean {
    return userRoles.some(userRole => allowedRoles.some(allowedRole => allowedRole === userRole));
}

export default authorize;
