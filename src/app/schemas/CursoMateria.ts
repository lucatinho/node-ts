import {model, Document} from 'mongoose';
import mongoose from "mongoose";

interface CursoMateriaInterface extends Document {
    curso: string;
    materia: string;
    ordem: number;
    isActive: boolean;
}

const CursoMateriaSchema = new mongoose.Schema({
    curso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso',
        required: true
    },
    materia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Materia',
        required: true
    },
    ordem: {
        type: Number,
        require: true
    },
    isActive: {
        type: Boolean,
        require: true,
        default: false
    }
});


export default model<CursoMateriaInterface>('CursoMateria', CursoMateriaSchema)
