import {model, Document} from 'mongoose';
import mongoose from "mongoose";

interface TurmaInterface extends Document {
    nome: string;
    cursos: Array<any>;
    isActive: boolean;
    start?: Date;
    finish?: Date;
    users?: Array<any>;
}

const TurmaSchema = new mongoose.Schema({
    nome: {
        type: String,
        unique: true,
        require: true
    },
    cursos: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Curso',
        required: true
    },
    isActive: {
        type: Boolean,
        require: true,
        default: false
    },
    start: {
        type: Date,
        required: true
    },
    finish: {
        type: Date,
        required: true
    },
    users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    }
});


export default model<TurmaInterface>('Turma', TurmaSchema)
