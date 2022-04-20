import {model, Document} from 'mongoose';
import mongoose from "mongoose";

interface CursoInterface extends Document {
    titulo: string;
    subtitulo: string;
    img: string;
    isActive: boolean;
    ordem: number;
    createdAt?: Date;
    curso_materias: Array<any>;
}

const CursoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        unique: true,
        require: true
    },
    subtitulo: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: true
    },
    isActive: {
        type: Boolean,
        require: true,
        default: false
    },
    ordem: {
        type: Number,
        require: true
    },
    curso_materias: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'CursoMateria'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        select: false
    }
});


export default model<CursoInterface>('Curso', CursoSchema)
