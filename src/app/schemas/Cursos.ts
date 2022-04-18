import {model, Document} from 'mongoose';
import mongoose from "mongoose";

interface CursoInterface extends Document {
    titulo: string;
    subtitulo: string;
    img: string;
    ativo: boolean;
    ordem: number;
    createdAt?: Date;
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});


export default model<CursoInterface>('Curso', CursoSchema)
