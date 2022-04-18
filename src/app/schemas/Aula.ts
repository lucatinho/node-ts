import {model, Document} from 'mongoose';
import mongoose from "mongoose";

interface AulaInterface extends Document {
    titulo: string;
    descricao: string;
    video: string;
    arquivos: string;
    ordem: number;
    isActive: boolean
    createdAt?: Date;
    materia: string;
}

const AulaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        unique: true,
        require: true
    },
    descricao: {
        type: String,
        require: true
    },
    video: {
        type: String,
        require: true
    },
    arquivos: {
        type: String,
        require: true
    },
    ordem: {
        type: Number,
        require: true,
        default: 0
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
    materia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Materia',
        required: true
    }
});


export default model<AulaInterface>('Aula', AulaSchema)
