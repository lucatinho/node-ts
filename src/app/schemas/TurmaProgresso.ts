import {model, Document} from 'mongoose';
import mongoose from "mongoose";

interface TurmaProgressoInterface extends Document {
    user: string;
    turma: string;
    progress?: Array<Progress>;
}

interface Progress {
    curso: string,
    qtdAulaView: number,
    atrasado: boolean
}

const TurmaProgressoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    turma: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TurmaProgresso',
        required: true
    },
    progress: [
        {
            curso: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Curso',
                required: true
            },
            qtdAulaView: {
                type: Number,
                default: 0
            },
            atrasado: {
                type: Boolean,
                default: false
            }
        }
    ]
});


export default model<TurmaProgressoInterface>('TurmaProgresso', TurmaProgressoSchema)
