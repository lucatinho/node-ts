import {model, Document} from 'mongoose';
import mongoose from "mongoose";

interface EnderecoInterface extends Document {
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: number;
    cep: number;
    complemento: string;
    user: string;
}

const EnderecoSchema = new mongoose.Schema({
    estado: {
        type: String,
        require: true
    },
    cidade: {
        type: String,
        require: true
    },
    bairro: {
        type: String,
        require: true
    },
    rua: {
        type: String,
        require: true
    },
    complemento: {
        type: String,
        require: true
    },
    numero: {
        type: Number,
        require: true
    },
    cep: {
        type: String,
        require: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InfoPerson',
        require: true
    }
});


export default model<EnderecoInterface>('Endereco', EnderecoSchema)



