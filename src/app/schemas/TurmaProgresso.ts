import {model, Document} from 'mongoose';
import mongoose from "mongoose";

interface TurmaProgressoInterface extends Document {
    user: string;
    turma: string;
    progress?: Array<Progress>;
}

interface Progress {
    curso: string,
    qtdAulaView: number
}

const TurmaProgressoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    turma: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Turma',
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
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
});


export default model<TurmaProgressoInterface>('TurmaProgresso', TurmaProgressoSchema)
