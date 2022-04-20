import {model, Document} from 'mongoose';
import mongoose from "mongoose";

interface ProgressoInterface extends Document {
    idaula: string;
    idmateria: string;
    idcurso: string;
    idcandidato: boolean;
    data?: Date;
}

const ProgressoSchema = new mongoose.Schema({
    idaula: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aula',
        require: true
    },
    idmateria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Materia',
        require: true
    },
    idcurso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso',
        require: true
    },
    idcandidato: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    data: {
        type: Date,
        default: Date.now
    }
});


export default model<ProgressoInterface>('Progresso', ProgressoSchema)
