import {model, Document} from 'mongoose';
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import {Roles} from "../enum/Roles";

interface UserInterface extends Document {
    name: string;
    email: string;
    password: string;
    roles: Array<Roles>;
    passwordResetToken?: string;
    passwordResetExpires: Date;
    isActive: boolean;
    createdAt?: Date;
    turma?: string;

    fullName(): string;
}

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true,
        select: false
    },
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetExpires: {
        type: Date,
        select: false
    },
    roles: {
        type: [String],
        enum: Roles,
        default: [Roles.ROLE_ALUNO]
    },
    isActive: {
        type: Boolean,
        require: true,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    infoPerson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InfoPerson'
    },
    turma: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Turma'
    }
});

UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

UserSchema.methods.fullName = function (): string {
    return this.name + ' ' + this.email;
}

export default model<UserInterface>('User', UserSchema)
