import {model, Document} from 'mongoose';
import mongoose from "mongoose";

interface TurmaProgressoInterface extends Document {
    nome: string;
    cursos: Array<any>;
    qtdAulas?: Number;
    isActive: boolean;
    createdAt?: Date;
    finish: Date;
    users?: Array<any>;
}

const TurmaProgressoSchema = new mongoose.Schema({
    turma: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TurmaProgresso',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    qtdAulaView: {
        type: Number,
        default: 0
    },
    atrasado: {
        type: Boolean,
        require: true,
        default: false
    }
});


export default model<TurmaProgressoInterface>('TurmaProgresso', TurmaProgressoSchema)
