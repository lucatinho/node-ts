import {model, Document} from 'mongoose';
import mongoose from "mongoose";

interface MateriaInterface extends Document {
    titulo: string;
    subtitulo: string;
    img: string;
    aulas: Array<any>;
    isActive: boolean;
    createdAt?: Date;
    curso: string;
}

const MateriaSchema = new mongoose.Schema({
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
    aulas: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Aula'
    },
    isActive: {
        type: Boolean,
        require: true,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    curso: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Curso',
        required: true
    }
});


export default model<MateriaInterface>('Materia', MateriaSchema)
