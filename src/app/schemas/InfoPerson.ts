import {model, Document} from 'mongoose';
import mongoose from "mongoose";

import {EscolaridadeType} from "../enum/escolaridade-type.enum";
import {GeneroType} from "../enum/genero-type.enum";
import {EtniaType} from "../enum/etnia-type.enum";
import {OrientacaoType} from "../enum/orientacao-type.enum";
import {RendaType} from "../enum/renda-type.enum";
import {EmpregadoType} from "../enum/empregado-type.enum";
import {EstadoCivilType} from "../enum/estadoCivil-type.enum";
import {QtdFilhosType} from "../enum/qtdFilhos-type.enum";

interface InfoPersonInterface extends Document {
    nome: string;
    sobrenome: string;
    email: string;
    cpf: string;
    rg: string;
    data_nascimento: Date;

    endereco: Array<any>;

    celular: string;
    linkedin: string;
    facebook: string;
    instagram: string;
    github: string;

    estado_civil: EstadoCivilType;
    genero: GeneroType;
    escolaridade: EscolaridadeType;

    etnia: EtniaType;
    orientacao: OrientacaoType;
    renda: RendaType;
    empregado: EmpregadoType;

    qtd_filhos: QtdFilhosType;
}

const InfoPersonSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    sobrenome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true
    },
    cpf: {
        type: String,
        unique: true,
        require: true
    },
    data_nascimento: {
        type: Date,
        require: true
    },
    celular: {
        type: String,
        require: true
    },
    linkedin: {
        type: String,
    },
    facebook: {
        type: String,
    },
    instagram: {
        type: String,
    },
    github: {
        type: String,
    },
    escolaridade: {
        type: Number,
        enum: EscolaridadeType,
        require: true
    },
    genero: {
        type: Number,
        enum: GeneroType,
        require: true
    },
    etnia: {
        type: Number,
        enum: EtniaType,
        require: true
    },
    orientacao: {
        type: Number,
        enum: OrientacaoType,
        require: true
    },
    renda: {
        type: Number,
        enum: RendaType,
        require: true
    },
    empregado: {
        type: Number,
        enum: EmpregadoType,
        require: true
    },
    estado_civil: {
        type: Number,
        enum: EstadoCivilType,
        require: true
    },
    qtd_filhos: {
        type: Number,
        enum: QtdFilhosType,
        require: true
    },
    endereco: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Endereco'
    },

});


export default model<InfoPersonInterface>('InfoPerson', InfoPersonSchema)
